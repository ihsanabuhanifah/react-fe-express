import React from "react";
import Layout from "../../components/layout/auth";
import { Form, Button, Message, Segment } from "semantic-ui-react";
import ErrorMessage from "../../components/templates/ErrorMessage";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email().required("Wajib di isi"),
  password: Yup.string()
    .min(6, "Password minimal 6 Karakter")
    .required("wajib di isi"),
});

export default function Login() {
  const [errorBE, setErrorBE] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const initialState = {
    email: "",
    password: "",
  };

  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    const result = await dispatch(authLogin(values));
    console.log("result", result);
    if (result.status === "Fail") {
      setErrorBE(result);
    }
    if (result.status === "Success") return navigate("/admin/dashboard");
  };

  console.log(errorBE);
  return (
    <Layout>
      <div className="w-3/4 px-10">
        <h1 className="text-xl uppercase font-bold  mb-10">login Page</h1>

      
        <Formik
          initialValues={initialState}
          validationSchema={RegisterSchema}
          enableReinitialize
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
             {errorBE?.msg !== undefined &&  <Message negative>{errorBE?.msg}</Message>}
              <Segment>
                <Form.Input
                  required
                  label="Email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  icon={"envelope"}
                  iconPosition="left"
                  error={errors.email && touched.email}
                />
                {errors.email && touched.email && (
                  <ErrorMessage>{errors.email}</ErrorMessage>
                )}
                <Form.Input
                  required
                  label="Password"
                  placeholder="Password"
                  name="password"
                  error={errors.name && touched.name}
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password && touched.password}
                  icon={{
                    name: "eye",
                    circular: true,
                    link: true,
                    onClick: () => setShowPassword(!showPassword),
                  }}
                  iconPosition="left"
                  type={showPassword ? "text" : "password"}
                />
                {errors.password && touched.password && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
                <Button
                  content={isLoading ? "Procces" : "Login"}
                  type="submit"
                  color="orange"
                  disabled={isSubmitting}
                />
              </Segment>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}
