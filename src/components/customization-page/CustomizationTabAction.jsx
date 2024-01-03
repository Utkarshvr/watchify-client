import { customiseUser, getUser } from "@/api/apiCalls";
import { API_URL } from "@/config/api.routes";
import { useAuthAPI } from "@/context/Auth/AuthProvider";
import {
  useCustomizationAPI,
  useCustomizationExtendedAPI,
  useCustomizationExtendedInfo,
  useCustomizationForm,
} from "@/context/Form/CustomizationFormContext";
import { objectsDiffer } from "@/helpers/utilityFunc";
import { Button, Flex, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

function createCustomizationFormData(values) {
  const formData = new FormData();

  const data = {
    // Branding
    user_picture: values.branding.user_picture.file,
    banner_image: values.branding.banner_image.file,

    // Basic Info
    name: values.basic.name,
    desc: values.basic.desc,
    user_handle: values.basic.user_handle,
    links: values.basic.links,
  };

  // Append fields to formData
  for (const field in data) {
    if (Array.isArray(data[field])) {
      // If the field is an array, loop through its items
      data[field].forEach(({ platform, url }, index) => {
        formData.append(`${field}[${index}][platform]`, platform);
        formData.append(`${field}[${index}][url]`, url);
      });
    } else {
      // For non-array fields, append directly
      formData.append(field, data[field]);
    }
  }
  return formData;
}

export default function CustomizationTabAction() {
  const values = useCustomizationForm();
  // const api = useCustomizationAPI();
  const userAPI = useAuthAPI();

  const { setToUserInitialState } = useCustomizationExtendedAPI();
  const { initialStateAccToUserObject } = useCustomizationExtendedInfo();

  // console.log(initialStateAccToUserObject, values);

  const differ = objectsDiffer(initialStateAccToUserObject, values);

  const onPublish = async () => {
    try {
      const formData = createCustomizationFormData(values);

      const { data } = await customiseUser(formData);
      console.log(data);
      message.success(data.msg);

      userAPI.onLoginStart();
      const { data: userData } = await getUser();

      if (data) {
        userAPI.onLoginSuccess(userData?.user);
      } else {
        userAPI.onLoginFailure();
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  return (
    <Flex gap={2}>
      <Button type="link">
        <Link target="_blank" to={"https://www.youtube.com/@uv_codes"}>
          View Channel
        </Link>
      </Button>
      <Button disabled={!differ} type="text" onClick={setToUserInitialState}>
        Cancel
      </Button>
      <Button disabled={!differ} type="primary" onClick={onPublish}>
        PUBLISH
      </Button>
    </Flex>
  );
}
