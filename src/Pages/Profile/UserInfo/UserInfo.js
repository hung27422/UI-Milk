import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";
import { Checkbox, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Button from "~/components/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { client } from "~/ApolloClient";
import useQueryPoint from "~/hooks/useQueryPoint";
const cx = classNames.bind(styles);
const CREATE_POINT = gql`
  mutation CreatePoint($input: userCreatePointInput!) {
    createPoint(input: $input) {
      string
    }
  }
`;
function UserInfo() {
  const { user } = useAuth0();
  const [value, setValue] = useState("");
  const [formValues, setFormValues] = useState({});
  const userIdLocal = localStorage.getItem("userId");
  const [createPoint] = useMutation(CREATE_POINT);
  const { data: dataPoint, refetch } = useQueryPoint();
  const [point, setPoint] = useState(null);
  const handleUpdateInfo = (id, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const handleCreatePoint = async () => {
    const userCreatePointInput = {
      input: {
        point: 0,
        userId: userIdLocal,
      },
    };
    const result = await createPoint({
      variables: {
        input: userCreatePointInput.input,
      },
    });
    refetch();
    console.log("Tạo point thành công: ", result);
  };
  useEffect(() => {
    if (dataPoint?.pointByUserId === null) {
      handleCreatePoint();
    } else {
      setPoint(dataPoint?.pointByUserId?.point);
    }
    // console.log("value", value); // Log the updated value in useEffect
  }, [dataPoint, value]);

  const { data, error } = useQuery(
    gql`
      query Users($amount: Int!, $page: Int!) {
        users(amount: $amount, page: $page) {
          email
          id
          imageURL
          name
          phoneNumber
          role {
            description
            id
            name
          }
          token
          address {
            city
            detail
            district
            id
            isDefault
            name
            phone
            userId
            ward
          }
        }
      }
    `,
    {
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIyMTJhZDFiOS0xYmJmLTRkODMtYmRiNy1hZTM4OGNlNGU2YjgiLCJuYW1lIjoibnVsbCIsImp0aSI6IjIxMkFEMUI5LTFCQkYtNEQ4My1CREI3LUFFMzg4Q0U0RTZCOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2OTk4NjE4OTEsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.tj9uDf8rqO-cotHtmFgV0wW6WfLu-nSQ8NShmI4AyzkJGngKelxIxxTMDZANWz4-8l5HudShCa-SFa3kHZoQpA`,
        },
      },
      variables: {
        amount: 50,
        page: 1,
      },
    }
  );
  const UPDATE_USER = gql`
    mutation UpdateUser(
      $updateUserId: userUUID!
      $input: userUpdateUserInput!
    ) {
      updateUser(id: $updateUserId, input: $input) {
        userUpdatedPayload {
          apiToken
          message
        }
      }
    }
  `;
  const handleUpdateUser = async (id, token) => {
    console.log(id);
    console.log(formValues);
    const userUpdateUserInput = {
      updateUserId: `${id}`,
      input: {
        email: null,
        name: formValues.name,
        phoneNumber: formValues.phoneNumber,
        imageURL: null,
        token: token,
      },
    };
    try {
      const result = await client.mutate({
        mutation: UPDATE_USER,
        context: {
          headers: {
            authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJmODhlZGFlOS1mNzhiLTQ2YTEtOTNmMC0yYTdjMmQwOTViMGMiLCJuYW1lIjoiVOG6pW4gSMO5bmcgSOG7kyIsImp0aSI6IkY4OEVEQUU5LUY3OEItNDZBMS05M0YwLTJBN0MyRDA5NUIwQyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAyODI1ODczLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.o5ruNE0RWtXFGb_0xstZHSpIoZHmTy9xBOgusLM-9NYsHlrOCQsAU0xJNEmlNIwnQiapx4dQkrcFefzrJ6NXnw`,
          },
        },
        variables: {
          updateUserId: userUpdateUserInput.updateUserId,
          input: userUpdateUserInput.input,
        },
      });
      console.log("Đã update user thành công:", result);
    } catch (error) {
      console.error("Lỗi khi update user:", error);
    }
  };
  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (data) {
      console.log(data);
    }
  }, [data, error]);

  return (
    <div className={cx("wrapper")}>
      {data?.users.map((item, index) => {
        if (item?.email === user?.email) {
          return (
            <div key={index + item.id}>
              <div className={cx("header")}>
                <img
                  className={cx("img-user")}
                  src={
                    formValues["imageURL"]
                      ? formValues["imageURL"]
                      : user?.picture
                  }
                  alt=""
                />
                <div className={cx("info-user")}>
                  <span className={cx("name")}>{item?.name}</span>
                  <span className={cx("location")}>
                    828 Sư Vạn Hạnh, Phường 12, Quận 10
                  </span>
                </div>
              </div>
              <div className={cx("content")}>
                <TextField
                  className={cx("input-data")}
                  id="name"
                  label={item?.name}
                  placeholder="Nhập tên bạn muốn thay đổi"
                  variant="outlined"
                  value={formValues["name"] || ""}
                  onChange={(e) => handleUpdateInfo("name", e.target.value)}
                />
                <TextField
                  className={cx("input-data")}
                  id="address"
                  label={"Điểm tích lũy"}
                  value={point}
                  variant="outlined"
                />
                <TextField
                  className={cx("input-data")}
                  id="phone"
                  label={item?.phoneNumber}
                  variant="outlined"
                  placeholder="Nhập số điện thoại bạn muốn thay đổi"
                  value={formValues["phoneNumber"] || ""}
                  onChange={(e) =>
                    handleUpdateInfo("phoneNumber", e.target.value)
                  }
                />

                <TextField
                  className={cx("input-data")}
                  id="email"
                  label={item?.email}
                  variant="outlined"
                />
              </div>
              <div className={cx("btn-action")}>
                <Button
                  userInfo
                  onClick={() => handleUpdateUser(item?.id, item?.token)}
                >
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          );
        }
        return <div key={index}></div>;
      })}
    </div>
  );
}

export default UserInfo;
