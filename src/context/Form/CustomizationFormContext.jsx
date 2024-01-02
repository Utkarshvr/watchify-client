import { useFormik } from "formik";
import { createContext, useContext, useEffect } from "react";
import { useAuthUser } from "../Auth/AuthProvider";

const INITIAL_STATE = {
  branding: {
    user_picture: {
      file: null,
      src: "",
    },
    banner_image: {
      file: null,
      src: "",
    },
  },
  basic: {
    id: "",
    name: "",
    desc: "",
    user_handle: "",
    channelID: "",
    links: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/uv._.codes/",
      },
    ],
  },
};

const CustomizationFormContext = createContext(INITIAL_STATE);
const CustomizationFormExtendedInfoContext = createContext();
const CustomizationFormAPIContext = createContext();
const CustomizationFormExtendedAPIContext = createContext();

export default function CustomizationFormProvider({ children }) {
  const user = useAuthUser();
  const initialStateAccToUserObject = INITIAL_STATE;

  // form submit
  const { values, ...api } = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit: async (values, { resetForm }) => {
      console.log("ON_SUBMIT");
    },
  });

  const setToUserInitialState = () => {
    if (user) {
      // Branding
      api.setFieldValue("branding.user_picture.src", user?.picture);
      initialStateAccToUserObject.branding.user_picture.src =
        user?.picture || "";

      api.setFieldValue("branding.banner_image.src", user?.banner_image || "");
      initialStateAccToUserObject.branding.banner_image.src =
        user?.banner_image || "";

      // Basic Info
      api.setFieldValue("basic.id", user?._id);
      initialStateAccToUserObject.basic.id = user?._id || "";

      api.setFieldValue("basic.name", user?.name);
      initialStateAccToUserObject.basic.name = user?.name || "";

      api.setFieldValue("basic.desc", user?.desc || "");
      initialStateAccToUserObject.basic.desc = user?.desc || "";

      api.setFieldValue("basic.user_handle", user?.user_handle);
      initialStateAccToUserObject.basic.user_handle = user?.user_handle || "";

      api.setFieldValue("basic.channelID", user?.channelID);
      initialStateAccToUserObject.basic.channelID = user?.channelID || "";

      api.setFieldValue("basic.links", user?.links);
      initialStateAccToUserObject.basic.links = user?.links || "";
    }
  };

  useEffect(() => {
    setToUserInitialState();
  }, [user]);

  return (
    <CustomizationFormAPIContext.Provider value={api}>
      <CustomizationFormContext.Provider value={values}>
        <CustomizationFormExtendedAPIContext.Provider
          value={{ setToUserInitialState }}
        >
          <CustomizationFormExtendedInfoContext.Provider
            value={{ initialStateAccToUserObject }}
          >
            {children}
          </CustomizationFormExtendedInfoContext.Provider>
        </CustomizationFormExtendedAPIContext.Provider>
      </CustomizationFormContext.Provider>
    </CustomizationFormAPIContext.Provider>
  );
}

export const useCustomizationForm = () => useContext(CustomizationFormContext);
export const useCustomizationAPI = () =>
  useContext(CustomizationFormAPIContext);
export const useCustomizationExtendedAPI = () =>
  useContext(CustomizationFormExtendedAPIContext);
export const useCustomizationExtendedInfo = () =>
  useContext(CustomizationFormExtendedInfoContext);
