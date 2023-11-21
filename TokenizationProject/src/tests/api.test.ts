const request = require('supertest');
const app = require('../index');



describe('GET /health', () => {
  it('Debe retornar estado saludable', async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);

  })
});




describe('Autorización: POST /v1/tokens', () => {
  test('Debe validar que el pk pasa los 24 caracteres', async () => {
    const payload = {
      card_number: "4111111111111111",
      cvv: 256,
      expiration_month: "12",
      expiration_year: "2027",
      email: "pedro.dev@yahoo.es"
    };

    const response = await request(app).post('/v1/tokens')
      .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0swfdfdff`)
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response.body.validation).toEqual("El pk del cliente no es válido")
  });

  test('Debe validar que el pk este vacío', async () => {
    const payload = {
      card_number: "4111111111111111",
      cvv: 256,
      expiration_month: "12",
      expiration_year: "2027",
      email: "pedro.dev@yahoo.es"
    };

    const response = await request(app).post('/v1/tokens')
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response.body.validation).toEqual("El pk del cliente no es válido")
  });

  /*   test('Debe validar que el pk no tenga autorización', async () => {
      const payload = {
        card_number: "4111111111111111",
        cvv: 256,
        expiration_month: "12",
        expiration_year: "2027",
        email: "pedro.dev@yahoo.es"
      };
  
      const response = await request(app).post('/v1/tokens')
        .set('Authorization', `Bearer pk_test_lsRbkEjzCo`)
        .send(payload);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.validation).toEqual("El pk del cliente no es válido")
    }); */

  /*   test('Debe validar que el pk tenga autorización', async () => {
      const payload = {
        card_number: "4111111111111111",
        cvv: 256,
        expiration_month: "12",
        expiration_year: "2027",
        email: "pedro.dev@yahoo.es"
      };
  
      const response = await request(app).post('/v1/tokens')
        .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
        .send(payload);
  
      expect(response.statusCode).toBe(200);
    }); */


});


describe('Operaciones: POST /v1/tokens', () => {
  /*   test('Debe retornar el token luego de ingresar los datos de la tarjeta', async () => {
      const payload = {
        card_number: "4111111111111111",
        cvv: 256,
        expiration_month: "12",
        expiration_year: "2027",
        email: "pedro.dev@yahoo.es"
      };
  
      const response = await request(app).post('/v1/tokens')
        .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
        .send(payload);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.token.length).toBe(16);
    }); */

  test('Debe validar el número de la tarjeta que no debe estar vacío', async () => {
    const payload = {
      card_number: "",
      cvv: 256,
      expiration_month: "12",
      expiration_year: "2027",
      email: "pedro.dev@yahoo.es"
    };

    const response = await request(app).post('/v1/tokens')
      .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
      .send(payload);

    expect(response.statusCode).toBe(422);
    expect(response.body.validation[0]).toEqual("Debe ingresar un número de tarjeta válida")
  });


  test('Debe validar el código cvv que no debe estar vacío', async () => {
    const payload = {
      card_number: "4111111111111111",
      cvv: 6,
      expiration_month: "12",
      expiration_year: "2027",
      email: "pedro.dev@yahoo.es"
    };

    const response = await request(app).post('/v1/tokens')
      .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
      .send(payload);

    expect(response.statusCode).toBe(422);
    expect(response.body.validation[0]).toEqual("Debe ingresar un número cvv válido")
  });

  test('Debe validar el mes de expiración que no debe estar vacío', async () => {
    const payload = {
      card_number: "4111111111111111",
      cvv: 256,
      expiration_month: "",
      expiration_year: "2027",
      email: "pedro.dev@yahoo.es"
    };

    const response = await request(app).post('/v1/tokens')
      .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
      .send(payload);

    expect(response.statusCode).toBe(422);
    expect(response.body.validation[0]).toEqual("Debe ingresar un mes válido")
  });


  test('Debe validar el año de expiración que no debe estar vacío', async () => {
    const payload = {
      card_number: "4111111111111111",
      cvv: 256,
      expiration_month: "12",
      expiration_year: "",
      email: "pedro.dev@yahoo.es"
    };

    const response = await request(app).post('/v1/tokens')
      .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
      .send(payload);

    expect(response.statusCode).toBe(422);
    expect(response.body.validation[0]).toEqual("Debe ingresar un año válido")
  });


  test('Debe validar el email que no debe estar vacío', async () => {
    const payload = {
      card_number: "4111111111111111",
      cvv: 256,
      expiration_month: "12",
      expiration_year: "2027",
      email: ""
    };

    const response = await request(app).post('/v1/tokens')
      .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
      .send(payload);

    expect(response.statusCode).toBe(422);
    expect(response.body.validation[0]).toEqual("Debe ingresar un email válido")
  });


  test('Debe validar el número de la tarjeta no sea válida, segun algoritmo LUHN', async () => {
    const payload = {
      card_number: "44542738505150162",
      cvv: 256,
      expiration_month: "12",
      expiration_year: "2027",
      email: "pedro.dev@yahoo.es"
    };

    const response = await request(app).post('/v1/tokens')
      .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
      .send(payload);

    expect(response.statusCode).toBe(422);
    expect(response.body.validation[0]).toEqual("Debe ingresar un número de tarjeta válida")
  });


  test('Debe validar que el año sea como máximo 5 años', async () => {
    const payload = {
      card_number: "4111111111111111",
      cvv: 256,
      expiration_month: "12",
      expiration_year: "2028",
      email: "pedro.dev@yahoo.es"
    };

    const response = await request(app).post('/v1/tokens')
      .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
      .send(payload);

    expect(response.statusCode).toBe(422);
    expect(response.body.validation[0]).toEqual("Debe ingresar un año válido")
  });

  test('Debe validar el email no corresponda a lps dominos “gmail.com o hotmail.com o yahoo.es', async () => {
    const payload = {
      card_number: "4111111111111111",
      cvv: 256,
      expiration_month: "12",
      expiration_year: "2027",
      email: "pedro.dev@domain.com"
    };

    const response = await request(app).post('/v1/tokens')
      .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
      .send(payload);

    expect(response.statusCode).toBe(422);
    expect(response.body.validation[0]).toEqual("Debe ingresar un email válido")

  });
  /* 
  
    test('Debe validar el email tenga el dominio gmail.com', async () => {
      const payload = {
        card_number: "4111111111111111",
        cvv: 256,
        expiration_month: "12",
        expiration_year: "2027",
        email: "correo@gmail.com"
      };
  
      const response = await request(app).post('/v1/tokens')
        .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
        .send(payload);
  
      expect(response.statusCode).toBe(200);
  
    });
  
  
    test('Debe validar el email tenga el dominio hotmail.com', async () => {
      const payload = {
        card_number: "4111111111111111",
        cvv: 256,
        expiration_month: "12",
        expiration_year: "2027",
        email: "correo@hotmail.com"
      };
  
      const response = await request(app).post('/v1/tokens')
        .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
        .send(payload);
  
      expect(response.statusCode).toBe(200);
  
    });
  
  
    test('Debe validar el email tenga el dominio yahoo.es', async () => {
      const payload = {
        card_number: "4111111111111111",
        cvv: 256,
        expiration_month: "12",
        expiration_year: "2027",
        email: "correo@yahoo.es"
      };
  
      const response = await request(app).post('/v1/tokens')
        .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
        .send(payload);
  
      expect(response.statusCode).toBe(200);
  
    });
   */


  describe('Operaciones: POST /v1/charges', () => {
    test('Debe validar que el token sea válido', async () => {
      const payload = {
        token: "sdf3rfrw3242342323423423432"
      };

      const response = await request(app).post('/v1/charges')
        .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
        .send(payload);

      expect(response.statusCode).toBe(422);
      expect(response.body.validation[0]).toEqual("El token no es válido")
    });
    /* 
        test('Debe validar que devuelva los datos de la tarjeta', async () => {
          const payloadCreditCard = {
            card_number: "4111111111111111",
            cvv: 256,
            expiration_month: "12",
            expiration_year: "2027",
            email: "pedro.dev@yahoo.es"
          };
    
          const responseToken = await request(app).post('/v1/tokens')
            .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
            .send(payloadCreditCard);
          expect(responseToken.statusCode).toBe(200);
    
          const payloadToken = {
            token: responseToken.body.token
          };
    
    
          const responseCredit = await request(app).post('/v1/charges')
            .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
            .send(payloadToken);
    
          expect(responseCredit.statusCode).toBe(200);
          expect(responseCredit.body).not.toBeNull();
        }); */

    /*     test('Debe validar que devuelva los datos de la tarjeta sin el código cvv', async () => {
          const payloadCreditCard = {
            card_number: "4111111111111111",
            cvv: 256,
            expiration_month: "12",
            expiration_year: "2027",
            email: "pedro.dev@yahoo.es"
          };
    
          const responseToken = await request(app).post('/v1/tokens')
            .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
            .send(payloadCreditCard);
          expect(responseToken.statusCode).toBe(200);
    
          const payloadToken = {
            token: responseToken.body.token
          };
    
          console.log(responseToken.token);
    
          const responseCredit = await request(app).post('/v1/charges')
            .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
            .send(payloadToken);
    
          expect(responseCredit.statusCode).toBe(200);
          expect(responseCredit.body.cvv).not.toBeNull();
        }); */

  });



  /*  test('Debe validar el token expirado', async () => {
     const payloadCreditCard = {
       card_number: "4111111111111111",
       cvv: 256,
       expiration_month: "12",
       expiration_year: "2027",
       email: "pedro.dev@yahoo.es"
     };
 
     const responseToken = await request(app).post('/v1/tokens')
       .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
       .send(payloadCreditCard);
     expect(responseToken.statusCode).toBe(200);
 
     const payloadToken = {
       token: responseToken.body.token
     };
 
     console.log(responseToken.token);
 
     const responseCredit = await request(app).post('/v1/charges')
       .set('Authorization', `Bearer pk_test_lsRbkEjzCoeEw0sw`)
       .send(payloadToken);
 
     expect(responseCredit.statusCode).toBe(200);
     expect(responseCredit.body.message).toEqual("El token ha expirado. Vuelva a generarlo");
   }); */

});
