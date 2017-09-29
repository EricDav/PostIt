const mockData = {
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
      fetchGroupPostRequest: jest.fn(() => Promise.resolve({})),
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
      viewers: [
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
      date: '2017-09-22T14:17:00.836Z'
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
  },
  logIn: {
    props: {
      userSigninRequest: jest.fn(),
      setPage: jest.fn(),
      error: {
        errorType: 'Login',
        errorMessage: 'Invalid details'
      }
    }
  },
  Group: {
    state: {
      groups: [{
        id: 2,
        name: 'Maths',
        description: 'Where we are'
      }],
      messages: [{
        id: 2,
        content: 'I love coding',
        senderId: 2,
        senderUsername: 'Pyhton',
        groupId: 2
      }],
      group: {
        id: 2,
        name: 'Maths',
        description: 'Where we are'
      },
      showDashboardPage: {
        showDashboardForm: 2
      }
    },
    props: {
      name: 'Falola',
      id: 1,
      newMessages: [{
        groupId: 2,
        newMessages: 1
      }],
      getGroupMembers: jest.fn(),
      getGroupMessages: jest.fn(() => Promise.resolve({})),
      dashboardPage: jest.fn(),
      groups: [{
        id: 2,
        name: 'Maths',
        description: 'Where we are'
      }],
    }
  },
  Button: {
    props: {
      fullName: 'Alienyi Jerry',
      addUserToAGroup: jest.fn(() => Promise.resolve({})),
      getGroupMembers: jest.fn()
    }
  },
  Piority: {
    props: {
      setPiority: jest.fn()
    }
  },
  Search: {
    state: {
      searchedUsers: [
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
      group: {
        id: 2,
        name: 'Maths',
        description: 'Where we are'
      },
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
      ],
      auth: {
        user: {
          currentUser: {
            userName: 'SuperFuck'
          }
        }
      }
    },
    props: {
      searchUsers: jest.fn(),
      users: [
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
      group: {
        id: 4
      },
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
      ],
    }
  },
  RightSideBar: {
    props: {
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
      ],
      viewNumber: 2,
      dashboardPage: 5,
      group: {
        id: 2,
        name: 'rat',
        description: 'I love coding'
      },
      deleteUser: {
        id: 2,
        fullName: 'Alienyi Daniel',
        userName: 'Python',
        email: 'alienyidavid@gmail.com',
        phoneNumber: '09077896805'
      },
      setCurrentGroup: {
        id: 2,
        name: 'rat',
        description: 'I love coding'
      },
      user: {
        id: 2,
        fullName: 'Alienyi Daniel',
        userName: 'Python',
        email: 'alienyidavid@gmail.com',
        phoneNumber: '09077896805'
      },
    }
  },
  GroupButton: {
    props: {
      isSmallScreenSize: true,
      setRightNavBarView: jest.fn(),
      dashboardPage: jest.fn()
    }
  },
  GroupHeader: {
    props: {
      group: {
        name: 'mark',
        creator: 'Pythagorras'
      },
      user: {
        userName: 'Pythagorras',
      },
      showDashboardPage: 2,
      dashboardPage: jest.fn()
    },
    showAlert: jest.fn()
  },
  EditUser: {
    props: {
      showUpdateUserPage: jest.fn(),
      updateUserProfile: jest.fn(),
      showInitial: 3,
      showDashboardPage: 1,
      user: {
        fullName: 'Akon sad',
        userName: 'Pent',
        email: 'das@me.com',
        phoneNumber: '09033445334'
      },
      currentUser: {
        userName: 'Python'
      }
    }
  }
};

export default mockData;
