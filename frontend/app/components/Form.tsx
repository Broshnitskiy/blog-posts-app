import { Button, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

import InputErrorMessage from "./InputErrorMessge";
import { PostDto } from "@/lib/api";
import toast from "react-hot-toast";
import { Post } from "@/types";

interface FormValues {
  title: string;
  author: string;
  content: string;
}

interface FormProps {
  handleClose: () => void;
  title: string;
  createPost?: (data: PostDto) => Promise<void>;
  updatePost?: (id: number, data: Partial<PostDto>) => Promise<void>;
  chosenPost?: Post | null;
}

const Form: FC<FormProps> = ({
  handleClose,
  title,
  createPost,
  updatePost,
  chosenPost,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: chosenPost ? chosenPost.title : "",
      author: chosenPost ? chosenPost.author : "",
      content: chosenPost ? chosenPost.content : "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { title, author, content } = data;

    try {
      if (createPost) {
        const dto: PostDto = {
          title: title.trim(),
          author: author.trim(),
          content: content.trim(),
        };

        await createPost(dto);
      }

      if (updatePost && chosenPost) {
        const updateDto: Partial<PostDto> = {};

        if (chosenPost.author !== author) updateDto.author = author.trim();
        if (chosenPost.title !== title) updateDto.title = title.trim();
        if (chosenPost.content !== content) updateDto.content = content.trim();

        if (Object.keys(updateDto).length > 0) {
          await updatePost(chosenPost.id, updateDto);
        } else {
          toast("You didn't change anything!");
          return;
        }
      }

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
