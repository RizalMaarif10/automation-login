describe('Tugas 18 - API Automation Platzi Fake Store', () => {


  const baseUrl = 'https://api.escuelajs.co/api/v1/categories';
  let createdCategoryId; 

  it('TC01 - Mengambil semua data', () => {
    cy.request('GET', baseUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it('TC02 - Mengambil satu data berdasarkan id', () => {

    cy.request('GET', `${baseUrl}/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
      expect(response.body).to.have.property('name');
    });
  });

  it('TC03 - Mengambil data yang tidak ada', () => {
   
    cy.request({ method: 'GET', url: `${baseUrl}/9999`, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(400); 
      expect(response.body.name).to.eq('EntityNotFoundError');
    });
  });

  it('TC04 - Mengambil data dengan Format ID Salah ', () => {
    cy.request({ method: 'GET', url: `${baseUrl}/halodunia`, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.contain('Validation failed');
    });
  });

  it('TC05 - Membuat Data Baru', () => {

    const uniqueName = "Elektronik Baru " + Date.now(); 
    
    const newCategory = {
      name: uniqueName,
      image: "https://placeimg.com/640/480/any"
    };

    cy.request('POST', baseUrl, newCategory).then((response) => {
      expect(response.status).to.eq(201); 
      expect(response.body.name).to.eq(uniqueName);
      expect(response.body).to.have.property('id');
      
      createdCategoryId = response.body.id; 
    });
  });

  it('TC06 - Gagal Membuat Data Tanpa Nama ', () => {
    const badCategory = { image: "https://placeimg.com/640/480/any" }; 

    cy.request({ method: 'POST', url: baseUrl, body: badCategory, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]); 
    });
  });

  it('TC07 - Gagal Membuat Data Tanpa Gambar ', () => {
    const badCategory = { name: "Nama Saja" }; 

    cy.request({ method: 'POST', url: baseUrl, body: badCategory, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.be.an('array'); 
    });
  });

  it('TC08 - Memperbarui Nama data', () => {
    const updateData = { name: "Data Telah Diubah" };
    cy.request('PUT', `${baseUrl}/2`, updateData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Data Telah Diubah');
    });
  });

  it('TC09 - Memperbarui Data yang Tidak Ada ', () => {
    const updateData = { name: "Data Hilang" };

    cy.request({ method: 'PUT', url: `${baseUrl}/999999`, body: updateData, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.name).to.eq('EntityNotFoundError');
    });
  });

  it('TC10 - Melihat Daftar Produk di Dalam Sebuah Kategori ', () => {
    cy.request('GET', `${baseUrl}/1/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('TC11 - Menghapus Data', () => {
    const tempCategory = {
      name: "Data Khusus Dihapus",
      image: "https://placeimg.com/640/480/any"
    };

    cy.request('POST', baseUrl, tempCategory).then((postResponse) => {
      const idToDelete = postResponse.body.id;

      cy.request('DELETE', `${baseUrl}/${idToDelete}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        
        // Memaksa nilai balasan menjadi String agar cocok dengan teks 'true'
        expect(String(deleteResponse.body)).to.eq('true'); 
      });
    });
  });

  it('TC12 - Gagal Menghapus Data yang Tidak Ada ', () => {
    cy.request({ method: 'DELETE', url: `${baseUrl}/9999`, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.name).to.eq('EntityNotFoundError');
    });
  });

});