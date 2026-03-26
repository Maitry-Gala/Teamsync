// import { devtools, persist } from "zustand/middleware";
// import { immer} from "zustand/middleware/immer";
// import { create, StateCreator } from "zustand";
// // import createSelectors from "./selectors";

// type AuthState = {
//     accessToken: string | null;
//     user: null;
//     setAccessToken : (token: string) => void;
//     clearAccessToken: () => void;
// };

// const createAuthSlice: StateCreator<AuthState> = (set) => ({
//     accessToken:null,
//     user:null,
//     setAccessToken: (token) => set({ accessToken: token}),
//     clearAccessToken: () => set({ accessToken: null}),
// });

// type StoreType = AuthState;

// export const useStore = create<StoreType>()(
//   devtools(
//     persist(
//       immer((...a) => ({
//         ...createAuthSlice(...a),
//       })),
//       {
//         name: "session-storage", 
//         getStorage: () => sessionStorage, 
//       }
//     )
//   )
// );

import { devtools, persist, createJSONStorage } from "zustand/middleware"; // ← add createJSONStorage
import { immer } from "zustand/middleware/immer";
import { create, StateCreator } from "zustand";

type AuthState = {
  accessToken: string | null;
  user: null;
  _hasHydrated: boolean; 
  setHasHydrated: (state: boolean) => void;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
};

const createAuthSlice: StateCreator<AuthState> = (set) => ({
  accessToken: null,
  user: null,
  _hasHydrated: false,
  setHasHydrated: (state) => set({ _hasHydrated: state }),
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
});

type StoreType = AuthState;

export const useStore = create<StoreType>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createAuthSlice(...a),
      })),
      {
        name: "session-storage",
        storage: createJSONStorage(() => sessionStorage), 
        onRehydrateStorage: () => (state) => {   
          state?.setHasHydrated(true);
        },
      }
    )
  )
);