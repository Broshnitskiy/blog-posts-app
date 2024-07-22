import { Button, IconButton, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import InputErrorMessage from "./InputErrorMessge";
import { mutate } from "swr";
import { PostDto } from "@/lib/api";
import toast from "react-hot-toast";

interface FormValues {
  title: string;
  author: string;
  content: string;
}

interface FormProps {
  handleClose: () => void;
  title: string;
  sendData: (data: PostDto) => Promise<void>;
}

const Form: FC<FormProps> = ({ handleClose, title, sendData }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await sendData(data);
      mutate("/post");

      toast.success("Success");
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Something wrong! Please, try later.");
    }
  };

  return (
    <>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        style={{ display: "flex", flexDirection: "column", gap: 30 }}
      >
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              sx={{ margin: 0 }}
              helperText={
                errors.title ? (
                  <InputErrorMessage message={errors.title.message || ""} />
                ) : (
                  ""
                )
              }
            />
          )}
        />

        <Controller
          name="author"
          control={control}
          defaultValue=""
          rules={{ required: "Author is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Author"
              fullWidth
              margin="normal"
              error={!!errors.author}
              sx={{ margin: 0 }}
              helperText={
                errors.author ? (
                  <InputErrorMessage message={errors.author.message || ""} />
                ) : (
                  ""
                )
              }
            />
          )}
        />

        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{ required: "Content is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Content"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.content}
              sx={{ margin: 0 }}
              helperText={
                errors.content ? (
                  <InputErrorMessage message={errors.content.message || ""} />
                ) : (
                  ""
                )
              }
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </>
  );
};

export default Form;
