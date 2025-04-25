import { useFormik } from "formik";
import { Segment } from "../../components/Segment";
import { zCreateTaskTrpcInput } from "@tasker/backend/src/router/task/createTask/input";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import { trpc } from "../../lib/trpc";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";

export const NewTaskPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const createTask = trpc.createTask.useMutation();

  const formik = useFormik({
    initialValues: { title: "" },
    validate: withZodSchema(zCreateTaskTrpcInput),
    onSubmit: async (values) => {
      await createTask.mutateAsync({ ...values });
      formik.resetForm();
      setSuccessMessageVisible(true);
      setTimeout(() => {
        setSuccessMessageVisible(false);
      }, 3000);
    },
  });

  return (
    <Segment title="Add Task">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <FormItems>
          <Input name="title" label="Title" formik={formik} />
          <Alert color="green" hidden={!successMessageVisible}>
            Task created!
          </Alert>
          <Button>Create Task</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
