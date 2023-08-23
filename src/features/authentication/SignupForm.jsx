import Button from "../../ui/Button";
import Form from "../../ui/form/Form";
import FormRow from "../../ui/form/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignup } from "./hooks/useSignup";
import SpinnerMini from "../../ui/SpinnerMini";
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, handleSubmit, getValues, reset } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="fullName"
          {...register("fullName", {
            required: {
              value: true,
              message: "Full name is required!",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "Emai is required!",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required!",
            },
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 character",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isLoading}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: {
              value: true,
              message: "Password confirm is required!",
            },
            validate: (value) =>
              value === getValues().password || "Password needs to match.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Create new user"}
          </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
