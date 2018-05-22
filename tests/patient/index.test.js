const config = require('../../config');
const tester = require('graphql-tester').tester;

describe('A Patient', function () {
  const self = this;
  beforeAll(() => {
    self.test = tester({
      url: `http://127.0.0.1:${config.APP_PORT}/${config.GQL_URL_DIR}`,
      contentType: 'application/json',
    });
  });
  it('should be created', (done) => {
    self
      .test(
        JSON.stringify({
          query: `mutation PatientCreate($resource: PatientInput!) {
  Patient {
    create(resource: $resource) {
      location
      resource {
        id
        identifier {
          system
          value
        }
        birthDate
        name {
          text
        }
      }
      information {
        issue {
          severity
          code
        }
      }
    }
  }
}`,
          variables: {
            resource: {
              name: {
                text: 'Testing name',
              },
              birthDate: '2015-07-04',
              identifier: {
                value: 'sdfsdfdd',
              },
            },
          },
        }),
        { jar: true },
      )
      .then((res) => {
        self.tempID = res.data.Patient.create.resource.id;
        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        done();
      });
  });
  it('should be deleted by ID', (done) => {
    self
      .test(
        JSON.stringify({
          query: `mutation PatientDelete($id: ID!) {
        Patient {
          delete(id: $id) {
            information {
              issue {
                code
                severity
                diagnostics
              }
            }
          }
        }
      }`,
          variables: {
            id: self.tempID,
          },
        }),
        { jar: true },
      )
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        expect(res.data.Patient.delete.information.issue[0].severity).toBe('information');
        expect(res.data.Patient.delete.information.issue[0].code).toBe('informational');
        done();
      });
  });
});
