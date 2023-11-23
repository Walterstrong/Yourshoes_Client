import { useRef, useState, useCallback } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Stack,
  Typography,
  Select,
  TextField,
} from "@mui/material";
import { BoArticleInput } from "types/boArticle";
import CommunityApiService from "app/apiServices/communityApiService";

import assert from "assert";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "app/lib/sweetAlert";
import { Definer } from "app/lib/Definer";

export const TuiEditor = (props: any) => {
  /** INITIALIZATIONSS **/

  const editorRef = useRef();
  const [communityArticleData, setCommunityArticleData] =
    useState<BoArticleInput>({
      art_subject: "",
      bo_id: "",
      art_content: "",
      art_image: "",
    });
  /** HANDLERS **/
  const uploadImage = async (image: any) => {
    try {
      const communityService = new CommunityApiService();
      const image_name = await communityService.uploadImageToServer(image);

      communityArticleData.art_image = image_name;
      setCommunityArticleData({ ...communityArticleData });
      const source = `${serverApi}/${image_name}`;
      return source;
    } catch (err) {
      console.log(`ERROR::: uploadImage, ${err}`);
    }
  };

  const changeCategoryHandler = (e: any) => {
    communityArticleData.bo_id = e.target.value;
    setCommunityArticleData({ ...communityArticleData });
  };

  const changeTitleHandler = useCallback(
    (e: any) => {
      communityArticleData.art_subject = e.target.value;
      setCommunityArticleData({ ...communityArticleData });
    },
    [communityArticleData.art_subject]
  );

  const handleRegisterButton = async () => {
    try {
      const editor: any = editorRef.current;
      const art_content = editor?.getInstance().getHTML();

      communityArticleData.art_content = art_content;

      assert.ok(
        communityArticleData.art_content !== "" &&
          communityArticleData.art_subject !== "" &&
          communityArticleData.bo_id !== "",
        Definer.input_err1
      );
      const communityService = new CommunityApiService();
      await communityService.createArticle(communityArticleData);
      await sweetTopSmallSuccessAlert("Article is created successfully!");
      props.setArticlesRebuild(new Date());
      props.setValue("1");
      //history.push("/member-page");
    } catch (err) {
      console.log(`ERROR::: handleRegisterButton, ${err}`);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack>
      <Stack
        direction="row"
        style={{ margin: "40px" }}
        justifyContent="space-evenly"
      >
        <Box className={"form_row"} style={{ width: "300px" }}>
          <Typography
            style={{ color: "rgb(225 255 233)", margin: "10px" }}
            variant="h3"
          >
            Category
          </Typography>
          <FormControl sx={{ width: "100%", background: "white" }}>
            <Select
              value={communityArticleData.bo_id}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={changeCategoryHandler}
            >
              <MenuItem value="">
                <span>Choose Category</span>
              </MenuItem>
              <MenuItem value={"useful"}>Useful</MenuItem>
              <MenuItem value={"evaluation"}>Review Product</MenuItem>
              <MenuItem value={"story"}>My story</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className={"form_row"} style={{ width: "300px" }}>
          <Typography
            style={{ color: "rgb(225 255 233)", margin: "10px" }}
            variant="h3"
          >
            Theme
          </Typography>
          <TextField
            id="filled-basic"
            label="Theme"
            variant="filled"
            style={{ width: "300px", background: "white" }}
            onChange={changeTitleHandler}
          />
        </Box>
      </Stack>

      {/*@ts-ignore*/}
      <Editor
        ref={editorRef}
        initialValue="Type here"
        placeholder="Type here"
        previewStyle="vertical"
        height="640px"
        initialEditType="WYSIWYG"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["image", "table", "link"],
          ["ul", "ol", "task"],
        ]}
        hooks={{
          addImageBlobHook: async (image: any, callback: any) => {
            const uploadImageURL = await uploadImage(image);
            console.log("uploadImageURL", uploadImageURL);
            callback(uploadImageURL);
            return false;
          },
        }}
        events={{
          load: function (param: any) {},
        }}
      />
      <Stack direction="row" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "30px", width: "250px", height: "45px" }}
          onClick={handleRegisterButton}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
};
