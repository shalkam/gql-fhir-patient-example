import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  meta: {
    id: {},
    extension: [{}],
    versionId: {},
    _versionId: {
      id: {},
      extension: [{}],
    },
    lastUpdated: Date,
    _lastUpdated: {
      id: {},
      extension: [{}],
    },
    profile: {},
    _profile: [
      {
        id: {},
        extension: [{}],
      },
    ],
    security: [
      {
        id: {},
        extension: [{}],
        system: {},
        _system: {
          id: {},
          extension: [{}],
        },
        version: {},
        _version: {
          id: {},
          extension: [{}],
        },
        code: {},
        _code: {
          id: {},
          extension: [{}],
        },
        display: {},
        _display: {
          id: {},
          extension: [{}],
        },
        userSelected: {},
        _userSelected: {
          id: {},
          extension: [{}],
        },
      },
    ],
    tag: [
      {
        id: {},
        extension: [{}],
        system: {},
        _system: {
          id: {},
          extension: [{}],
        },
        version: {},
        _version: {
          id: {},
          extension: [{}],
        },
        code: {},
        _code: {
          id: {},
          extension: [{}],
        },
        display: {},
        _display: {
          id: {},
          extension: [{}],
        },
        userSelected: {},
        _userSelected: {
          id: {},
          extension: [{}],
        },
      },
    ],
  },
  implicitRules: {},
  _implicitRules: {
    id: {},
    extension: [{}],
  },
  language: {},
  _language: {
    id: {},
    extension: [{}],
  },
  text: {
    id: {},
    extension: [{}],
    status: {},
    _status: {
      id: {},
      extension: [{}],
    },
    div: {},
    _div: {
      id: {},
      extension: [{}],
    },
  },
  contained: [
    {
      resourceType: String,
      id: {},
      meta: {
        id: {},
        extension: [{}],
        versionId: {},
        _versionId: {
          id: {},
          extension: [{}],
        },
        lastUpdated: Date,
        _lastUpdated: {
          id: {},
          extension: [{}],
        },
        profile: {},
        _profile: [
          {
            id: {},
            extension: [{}],
          },
        ],
        security: [
          {
            id: {},
            extension: [{}],
            system: {},
            _system: {
              id: {},
              extension: [{}],
            },
            version: {},
            _version: {
              id: {},
              extension: [{}],
            },
            code: {},
            _code: {
              id: {},
              extension: [{}],
            },
            display: {},
            _display: {
              id: {},
              extension: [{}],
            },
            userSelected: {},
            _userSelected: {
              id: {},
              extension: [{}],
            },
          },
        ],
        tag: [
          {
            id: {},
            extension: [{}],
            system: {},
            _system: {
              id: {},
              extension: [{}],
            },
            version: {},
            _version: {
              id: {},
              extension: [{}],
            },
            code: {},
            _code: {
              id: {},
              extension: [{}],
            },
            display: {},
            _display: {
              id: {},
              extension: [{}],
            },
            userSelected: {},
            _userSelected: {
              id: {},
              extension: [{}],
            },
          },
        ],
      },
      implicitRules: String,
      _implicitRules: {
        id: {},
        extension: [{}],
      },
      language: String,
      _language: {
        id: {},
        extension: [{}],
      },
    },
  ],
  extension: [{}],
  modifierExtension: [{}],
  identifier: {
    id: String,
    extension: [{}],
    use: {},
    _use: {
      id: {},
      extension: [{}],
    },
    type: {
      id: String,
      extension: [{}],
      coding: [
        {
          id: {},
          extension: [{}],
          system: {},
          _system: {
            id: {},
            extension: [{}],
          },
          version: {},
          _version: {
            id: {},
            extension: [{}],
          },
          code: {},
          _code: {
            id: {},
            extension: [{}],
          },
          display: {},
          _display: {
            id: {},
            extension: [{}],
          },
          userSelected: {},
          _userSelected: {
            id: {},
            extension: [{}],
          },
        },
      ],
      text: String,
      _text: {
        id: {},
        extension: [{}],
      },
    },
    system: { type: String },
    _system: {
      id: {},
      extension: [{}],
    },
    value: String,
    _value: {
      id: {},
      extension: [{}],
    },
    period: {
      id: String,
      extension: [{}],
      start: Date,
      _start: {
        id: {},
        extension: [{}],
      },
      end: Date,
      _end: {
        id: {},
        extension: [{}],
      },
    },
    assigner: {
      id: String,
      extension: [{}],
      reference: String,
      _reference: {
        id: {},
        extension: [{}],
      },
      identifier: {},
      display: String,
      _display: {
        id: {},
        extension: [{}],
      },
    },
  },
  name: {
    id: String,
    extension: [{}],
    use: {},
    _use: {
      id: {},
      extension: [{}],
    },
    text: String,
    _text: {
      id: {},
      extension: [{}],
    },
    family: String,
    _family: {
      id: {},
      extension: [{}],
    },
    given: String,
    _given: [
      {
        id: {},
        extension: [{}],
      },
    ],
    prefix: String,
    _prefix: [
      {
        id: {},
        extension: [{}],
      },
    ],
    suffix: String,
    _suffix: [
      {
        id: {},
        extension: [{}],
      },
    ],
    period: {
      id: String,
      extension: [{}],
      start: Date,
      _start: {
        id: {},
        extension: [{}],
      },
      end: Date,
      _end: {
        id: {},
        extension: [{}],
      },
    },
  },
  telecom: {
    id: String,
    extension: [{}],
    system: {},
    _system: {
      id: {},
      extension: [{}],
    },
    value: String,
    _value: {
      id: {},
      extension: [{}],
    },
    use: {},
    _use: {
      id: {},
      extension: [{}],
    },
    rank: {},
    _rank: {
      id: {},
      extension: [{}],
    },
    period: {
      id: String,
      extension: [{}],
      start: Date,
      _start: {
        id: {},
        extension: [{}],
      },
      end: Date,
      _end: {
        id: {},
        extension: [{}],
      },
    },
  },
  gender: {},
  _gender: {
    id: {},
    extension: [{}],
  },
  birthDate: Date,
  _birthDate: {
    id: {},
    extension: [{}],
  },
  address: {
    id: String,
    extension: [{}],
    use: {},
    _use: {
      id: {},
      extension: [{}],
    },
    type: {},
    _type: {
      id: {},
      extension: [{}],
    },
    text: String,
    _text: {
      id: {},
      extension: [{}],
    },
    line: String,
    _line: [
      {
        id: {},
        extension: [{}],
      },
    ],
    city: String,
    _city: {
      id: {},
      extension: [{}],
    },
    district: String,
    _district: {
      id: {},
      extension: [{}],
    },
    state: String,
    _state: {
      id: {},
      extension: [{}],
    },
    postalCode: String,
    _postalCode: {
      id: {},
      extension: [{}],
    },
    country: String,
    _country: {
      id: {},
      extension: [{}],
    },
    period: {
      id: String,
      extension: [{}],
      start: Date,
      _start: {
        id: {},
        extension: [{}],
      },
      end: Date,
      _end: {
        id: {},
        extension: [{}],
      },
    },
  },
  communication: [
    {
      id: String,
      extension: [{}],
      modifierExtension: [{}],
      language: {
        id: String,
        extension: [{}],
        coding: [
          {
            id: {},
            extension: [{}],
            system: {},
            _system: {
              id: {},
              extension: [{}],
            },
            version: {},
            _version: {
              id: {},
              extension: [{}],
            },
            code: {},
            _code: {
              id: {},
              extension: [{}],
            },
            display: {},
            _display: {
              id: {},
              extension: [{}],
            },
            userSelected: {},
            _userSelected: {
              id: {},
              extension: [{}],
            },
          },
        ],
        text: String,
        _text: {
          id: {},
          extension: [{}],
        },
      },
      preferred: Boolean,
      _preferred: {
        id: {},
        extension: [{}],
      },
    },
  ],
});
schema.pre('save', function preSave(next) {
  // adding fixed value to identifier field if it has a value
  if (this.identifier && this.identifier.value) {
    this.identifier.system = 'urn:oid:2.16.756.5.30.1.123.100.1.1.1';
  }
  next();
});
export default mongoose.model('patient', schema);
