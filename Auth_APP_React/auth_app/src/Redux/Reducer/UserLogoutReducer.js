const initialState = {
    user: null,
  };
  const UserLogoutReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGOUT_USER':
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default UserLogoutReducer;