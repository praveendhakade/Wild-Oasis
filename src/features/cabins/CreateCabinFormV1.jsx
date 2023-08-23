import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/form/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import FormRow from "../../ui/form/FormRow";


/* eslint-disable react/prop-types */
function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const querClient = useQueryClient();
  const { errors } = formState;

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      querClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    mutate({...data, image: data.image[0]});
  };

  const onError = () => {
    // console.log(error)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: {
              value: true,
              message: "Max capacity is required",
            },
            min: {
              value: 1,
              message: "Capacity should atleast be 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: {
              value: true,
              message: "Regular price is required",
            },
            min: {
              value: 1,
              message: "Capacity should atleast be 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            required: {
              value: true,
              message: "Discount is required",
            },
            validate: (value) =>
              getValues().regularPrice >= value ||
              "Discount should be less than price.",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: {
              value: true,
              message: "Description is required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: {
              value: true,
              message: "Image is required",
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
