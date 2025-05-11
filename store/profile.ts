import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import  AlertIcon  from '@/assets/icons/alert-icon.svg';
import Swal from 'sweetalert2';
import axiosInstance from '@/utils/axiosClient';

// Define authentication state interface
interface AuthState {
  id: string | null;
  userType: string | null;
  token: string | null;
  full_name: string | null;
  email: string | null;
  avatar: string | null;
  userCompletePhone: string | null;
  phone: string | null;
  code: string | null;
  locale: string | null;
  gender: string | null;
  country: {
    id: string | null;
    phone_code: string | null;
  };
  city_id: string | null;
  is_allow_notification: any;
  isLoading: boolean;
}

const initialState: AuthState = {
  id: null,
  userType: null,
  token: null,
  full_name: null,
  email: null,
  avatar: null,
  userCompletePhone: null,
  phone: "",
  code: "",
  locale: null,
  gender: null,
  country: {
    id: null,
    phone_code: null,
  },
  city_id: null,
  isLoading: true,
  is_allow_notification: false
};

// Async thunk to fetch authenticated user data
export const getAuthedUserData = createAsyncThunk(
  'auth/getAuthedUserData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/profile');

      if (response.status === 200) {
        const userData = response.data.data;

        // Set initial values and merge with fetched data
        const updatedUserData = {
          ...initialState, // Ensure initial values are set
          ...userData,
          country: {
            ...initialState.country, 
            ...userData.country,
          },
        };

        dispatch(setAuthedUserData(updatedUserData));
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const handleChangePhone = createAsyncThunk(
  'auth/handleChangePhone',
  async ({values}:{values:any}, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/edit_phone',{values});
      console.log("🚀 ~ response:", response)

      if (response.status === 200) {
    
        // dispatch(setAuthedUserData(updatedUserData));
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/logout');
    console.log("🚀 ~ logout ~ response:", response)
    if (response.status === 200) {
      toast.success(response?.data?.message)
      dispatch(deleteAuthedUserData())
      window.location.href = "/"
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteAccount = createAsyncThunk('auth/deleteAccount', async ({router}:any, { dispatch, rejectWithValue }) => {
    const result = await Swal.fire({
      title: 'انتبه <br/> تعديلات غير محفوظة',
      text: 'هل انت متأكد من حذف الحساب ؟',
      iconHtml:`<img width="120" src="${AlertIcon.src}" class="size-[110px]"/>`,
      showConfirmButton:true,
      showCancelButton:true,
      buttonsStyling:false,
      customClass:{
        icon:"border-none",
        title:"swal-title",
        htmlContainer:"swal-desc",
        confirmButton:"app-btn mx-2",
        cancelButton:"app-btn outline-btn"
      },
      // showCancelButton: true,
      confirmButtonText: 'احفظ التعديلات',
      cancelButtonText: 'الغاء التعديل',
    });

    if (result.isConfirmed) {
      try {
        const {data} = await axiosInstance.delete('/delete_my_account');
        if (data?.status === "success") {
          dispatch(deleteAuthedUserData());
          await Swal.fire({
            title: 'تم الحذف بنجاح',
            icon: 'success',
            showCancelButton: false,
            customClass:{
              title:"swal-title",
              confirmButton:"app-btn",
            },
          });
          router.replace('/')
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthedUserData: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload);
      // Set cookies with user data
      Cookies.set('shams_pharmacy_user_id', action.payload.id || '',{expires: 30});
      Cookies.set('shams_pharmacy_user_token', action.payload.token || '',{expires: 30});
      Cookies.set('shams_pharmacy_user_avatar', action.payload.avatar || '',{expires: 30});
      Cookies.set('shams_pharmacy_user_name', action.payload.full_name || '',{expires: 30});
      Cookies.set('shams_pharmacy_email', action.payload.email || '',{expires: 30});
      Cookies.set('shams_pharmacy_country_id', action.payload.country?.id || '',{expires: 30});
      Cookies.set('shams_pharmacy_user_phone', `+${action.payload.country?.phone_code}${action.payload.phone}` || '',{expires: 30});
      Cookies.set('shams_Lang', action.payload.locale || '',{expires: 30});
      Cookies.set('shams_allow_notification', action.payload.is_allow_notification,{expires: 30});
    },
    deleteAuthedUserData: (state) => {
      Object.assign(state, initialState);
      Cookies.remove('shams_pharmacy_user_id');
      Cookies.remove('shams_pharmacy_user_token');
      Cookies.remove('shams_pharmacy_user_avatar');
      Cookies.remove('shams_pharmacy_user_name');
      Cookies.remove('shams_pharmacy_email');
      Cookies.remove('shams_pharmacy_country_id');
      Cookies.remove('shams_pharmacy_user_phone');
      Cookies.remove('shams_Lang');
      Cookies.remove('shams_allow_notification');
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthedUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuthedUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the state with the fetched user data
        Object.assign(state, action.payload);
      })
      .addCase(getAuthedUserData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(handleChangePhone.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleChangePhone.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(handleChangePhone.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setAuthedUserData, deleteAuthedUserData, resetState } = authSlice.actions;
export default authSlice.reducer;
