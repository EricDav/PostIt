export const mockData = {
  signIn: {
    state: {
      forgetPassword: [
        {
          message: 'Password successfully changed'
        }
      ]
    },
    props: {
      signInRequest: jest.fn(),
      googleAuthRequest: jest.fn(),
      forgetPasswordRequest: jest.fn()
    },
    event: {
      target: {
        name: 'name',
        value: 'Dan',
      }
    },
    target: {
      target: {
        name: 'username',
        value: 'Samuel'
      }
    }
  },
  signUp: {
    props: {
      signUpRequest: jest.fn(),
      googleAuthRequest: jest.fn(),
      signup: {
        errors: {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    event: {
      target: {
        name: 'name',
        value: 'Dan',
      }
    },
    target: {
      target: {
        name: 'username',
        value: 'Samuel'
      }
    }
  },
  groupList: {
    props: {
      fetchGroupRequest: jest.fn(),
      fetchUserGroupRequest: jest.fn(),
      groups: [
        {
          groupId: 1,
          groupName: 'Andela Games'
        },
        {
          groupId: 2,
          groupName: 'Hack for Life'
        }
      ],
      signin: {
        user: {
          userId: 45
        }
      }
    },
    state: {
      groups: [
        {
          groupId: 1,
          groupName: 'Andela Games'
        },
        {
          groupId: 2,
          groupName: 'Hack for Life'
        }
      ],
      searchResult: {
        pageCount: 6,
        users: ['Samuel', 'Kachi', 'John']
      },
      groupMembers: ['Samuel']
    }
  },
  addUser: {
    props: {
      fetchUsersRequest: jest.fn(),
      addUserRequest: jest.fn(),
      fetchGroupUsers: jest.fn(),
      groupMembers: ['Samuel'],
      searchResult: {
        pageCount: 6,
        paginatedUsers: [
          {
            id: 2,
            username: 'Samuel'
          },
          {
            id: 4,
            username: 'Paul'
          }
        ]
      },
      userIds: [9, 10],
      groups: [
        {
          groupId: 1,
          groupName: 'Andela Games'
        },
        {
          groupId: 2,
          groupName: 'Hack for Life'
        }
      ]
    },
    state: {
      groups: [
        {
          groupId: 1,
          groupName: 'Andela Games'
        },
        {
          groupId: 2,
          groupName: 'Hack for Life'
        }
      ],
      searchResult: {
        pageCount: 6,
        users: ['Samuel', 'Kachi', 'John']
      },
      groupMembers: ['Samuel']
    },
    event: {
      target: {
        name: 'groupId',
        value: '2',
      }
    },
    event2: {
      target: {
        name: 'usernames',
        value: 'Ben',
      }
    }
  },
  groupModal: {
    props: {
      createGroup: jest.fn(),
    },
    event: {
      target: {
        name: 'groupName',
        value: 'Andela Team 08',
      },
      preventDefault: jest.fn()
    }
  },
  postedMessage: {
    props: {
      messages: ['I am going now', 'I will be with you'],
      fetchPostRequest: jest.fn(),
      updateGroupInfo: jest.fn(),
      signin: {
        isAuthenticated: true,
        user: {
          userId: 7
        }
      },
      match: {
        params: {
          groupId: 9
        },
        groupName: 'Andela'
      }
    },
    initialState: {
      post: {
        message: 'Good one'
      }
    },
    state: {
      signin: {
        user: [{
          userId: 9,
          userName: 'Sam'
        }]
      },
      messages: [
        {
          content: 'I am here'
        }
      ]
    }
  },
  selectGroup: {
    state: {
      groups: [
        {
          groupId: 2,
          groupName: 'Amiala'
        },
        {
          groupId: 9,
          groupName: 'Viam'
        }
      ]
    },
    props: {
      fetchUserGroupRequest: jest.fn(),
      fetchGroupPostRequest: jest.fn(() => {
        return Promise.resolve({});
      }),
      viewPost: jest.fn(),
      groups: ['Andela 23', 'Andela 32'],
      groupPost: {
        data: ['Testing it out', 'Testing'],
      },
      signin: {
        user: {
          userId: 9
        }
      }
    },
    target: {
      target: {
        name: 'groupId',
        value: '23'
      }
    }
  },
  viewMembers: {
    state: {
      fetchMembers: [
        {
          username: 'Super Mike'
        },
        {
          username: 'Samuel'
        }
      ]

    }
  },
  members: {
    props: {
        member: {
            fullName: 'Alienyi David',
            active: false
        }
    }
  },
  dashboardHeader: {
      props: {
        logout: jest.fn(),
        dashboardPage: jest.fn()
      },
      state: {
          currentPage: 1,
          isSmallScreenSize: false
      }
  },
  GroupButton: {
      props: {
          setRightNavBarView: jest.fn(),
          text: 'Message'
      }
  },
  SearchUser: {
      props: {
          fullName: 'Alienyi Daniel',
          userName: 'Python',
          members: [
      {
        id: 1,
        fullName: 'Alienyi David',
        userName: 'Pythagoras',
        email: 'alieny.idavid@andela.com',
        phoneNumber: '09087896875'
      },
      {
        id: 2,
        fullName: 'Alienyi Daniel',
        userName: 'Python',
        email: 'alienyidavid@gmail.com',
        phoneNumber: '09077896805'
      }
    ]
      }
  },
  Message: {
      props: {
          name: 'Ade',
          viewers:  [
      {
        id: 1,
        fullName: 'Alienyi David',
        userName: 'Pythagoras',
        email: 'alieny.idavid@andela.com',
        phoneNumber: '09087896875'
      },
      {
        id: 2,
        fullName: 'Alienyi Daniel',
        userName: 'Python',
        email: 'alienyidavid@gmail.com',
        phoneNumber: '09077896805'
      }
    ],
    date: "2017-09-22T14:17:00.836Z"
      },
      state: {
              auth: {
                  user: {
                      currentUser: {
                          userName: 'SuperFuck'
                }
            }
        }
    }
  }
};