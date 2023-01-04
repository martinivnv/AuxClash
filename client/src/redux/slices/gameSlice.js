import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	lobbyCode: localStorage.getItem("lobbyCode"),
	players: [],
	/*
	**Player Schema**
	Name: string
	Id: string
	score: int
	host: boolean
	answers: string[]
	colour: string
	*/
};

// export const login_Action = createAsyncThunk(
//     'auth/login',
//     async (params, { dispatch, rejectWithValue }) => {
//       const { orgUrl, email, password } = params;
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };

//       try {
//         // attempt to login
//         const res = await axios.post(
//           '/api/v1/auth/login',
//           { orgUrl, email: email, password: password },
//           config
//         );

//         // if successful, store token
//         localStorage.setItem('token', res.data.dataPayload.token);

//         // load user
//         dispatch(loadUser_Action());

//         // trigger reducer
//         return res.data;
//       } catch (err) {
//         return rejectWithValue(err.response.data);
//       }
//     }
//   );

export const gameSlice = createSlice({
	name: "auth",
	initialState,
	// extraReducers: (builder) => {
	//   builder
	//     // login
	//     .addCase(login_Action.pending, (state) => {
	//       state.loginLoading = true;
	//     })
	//     .addCase(login_Action.fulfilled, (state, action) => {
	//       localStorage.setItem('token', action.payload.dataPayload.token);
	//       state.loginLoading = false;
	//       state.isAuthenticated = true;
	//     })
	//     .addCase(login_Action.rejected, (state, action) => {
	//       state.loginLoading = false;
	//       state.error = action.error.message || 'something went wrong';
	//       if (action.payload.message) {
	//         toast.error(action.payload.message, { toastId: 'login-error' });
	//       }
	//     })
	// },
});

export default gameSlice.reducer;
