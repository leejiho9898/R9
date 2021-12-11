import React from "react";
import DaumPostcode, { Address } from "react-daum-postcode";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectJob } from "~/redux/slices/job-slice";
import { useToggle } from "~/hooks/useToggle";
import useDaumAdress from "~/hooks/kakao/useDaumAdress";
import useJobForm from "~/hooks/job/useJobForm";
import HashTagClick from "../common/HashTagClick";
import moment from "moment";

interface EditorProps {
  isEdit: boolean;
}

const JobPostEditor = ({ isEdit }: EditorProps) => {
  const job = useSelector(selectJob);
  const [isModal, onToggleModal] = useToggle();
  const [zonecode, address1, onCompletePost] = useDaumAdress();
  const {
    onChangeNumber,
    onChangeString,
    onChangeAdress,
    onChangeWorkingDay,
    onCreateJob,
  } = useJobForm();
  const { title, workType, payment, personnel, age, gender, wage, sectors } =
    job;

  const onCompletePostAndToggleModal = (data: Address) => {
    onCompletePost(data);
    onToggleModal();
  };
  return (
    <Paper sx={{ padding: "25px" }}>
      {!isEdit ? (
        <Stack spacing={2} py={4}>
          <Typography align="center" variant="h4">
            공고 등록
          </Typography>

          <Typography align="left" variant="h6">
            제목
          </Typography>
          <TextField
            variant="outlined"
            label="공고 제목"
            name="title"
            onChange={onChangeString}
            value={title}
          />

          <Typography align="left" variant="h6">
            근무 형태 (ex. 홀서빙)
          </Typography>
          <TextField
            variant="outlined"
            label="근무 형태"
            name="workType"
            onChange={onChangeString}
            value={workType}
          />
          <Typography align="left" variant="h6">
            업직종
          </Typography>
          <TextField
            variant="outlined"
            label="업직종"
            name="sectors"
            onChange={onChangeString}
            value={sectors}
          />
          <Typography align="left" variant="h6">
            모집 인원
          </Typography>
          <TextField
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            variant="outlined"
            label="모집 인원 (명)"
            name="personnel"
            onChange={onChangeNumber}
            value={personnel}
          />
          <Typography align="left" variant="h6">
            성별
          </Typography>
          <Select
            style={{ width: "7rem" }}
            label="성별"
            name="gender"
            onChange={onChangeString}
            value={gender}
          >
            <MenuItem value="ANY">상관없음</MenuItem>
            <MenuItem value="MAIL">남성</MenuItem>
            <MenuItem value="FEMAIL">여성</MenuItem>
          </Select>

          <Typography align="left" variant="h6">
            희망 연령대
          </Typography>
          <TextField
            type="number"
            variant="outlined"
            label="희망 연령대 (세)"
            name="age"
            onChange={onChangeNumber}
            value={age}
          />

          <Typography align="left" variant="h6">
            급여
          </Typography>
          <Stack direction="row" spacing={4}>
            <Select
              style={{ width: "7rem" }}
              label="급여 형태"
              name="payment"
              onChange={onChangeString}
              value={payment}
            >
              <MenuItem value="PERHOUR">시급</MenuItem>
              <MenuItem value="PERDAY">일급</MenuItem>
              <MenuItem value="PERMONTH">월급</MenuItem>
            </Select>

            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              label="급여 (원)"
              name="wage"
              onChange={onChangeNumber}
              value={wage}
            />
          </Stack>
          <Typography align="left" variant="h6">
            근무 요일
          </Typography>

          <FormGroup>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControlLabel
                control={
                  <Checkbox value={1} id="월" onChange={onChangeWorkingDay} />
                }
                label="월"
              />
              <FormControlLabel
                control={
                  <Checkbox value={2} id="화" onChange={onChangeWorkingDay} />
                }
                label="화"
              />
              <FormControlLabel
                control={
                  <Checkbox value={3} id="수" onChange={onChangeWorkingDay} />
                }
                label="수"
              />
              <FormControlLabel
                control={
                  <Checkbox value={4} id="목" onChange={onChangeWorkingDay} />
                }
                label="목"
              />
              <FormControlLabel
                control={
                  <Checkbox value={5} id="금" onChange={onChangeWorkingDay} />
                }
                label="금"
              />
              <FormControlLabel
                control={
                  <Checkbox value={6} id="토" onChange={onChangeWorkingDay} />
                }
                label="토"
              />
              <FormControlLabel
                control={
                  <Checkbox value={7} id="일" onChange={onChangeWorkingDay} />
                }
                label="일"
              />
            </Box>
          </FormGroup>

          <Typography align="left" variant="h6">
            근무 내용
          </Typography>

          <TextField
            multiline
            minRows={30}
            maxRows={100}
            variant="outlined"
            label="근무 내용"
            name="detail"
            onChange={onChangeString}
          />

          <Typography align="left" variant="h6">
            근무 일자
          </Typography>
          <FormGroup>
            <RadioGroup defaultValue="하루" name="period">
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <FormControlLabel
                  label="하루(1~2일)"
                  control={<Radio value="하루" onChange={onChangeString} />}
                />
                <FormControlLabel
                  control={
                    <Radio value="1주일이하" onChange={onChangeString} />
                  }
                  label="1주일 이하"
                />
                <FormControlLabel
                  control={
                    <Radio value="1주일~1개월" onChange={onChangeString} />
                  }
                  label="1주일~1개월"
                />
                <FormControlLabel
                  control={
                    <Radio value="1개월~3개월" onChange={onChangeString} />
                  }
                  label="1개월~3개월"
                />
                <FormControlLabel
                  control={
                    <Radio value="3개월~6개월" onChange={onChangeString} />
                  }
                  label="3개월~6개월"
                />
                <FormControlLabel
                  control={
                    <Radio value="6개월~1년" onChange={onChangeString} />
                  }
                  label="6개월~1년"
                />
                <FormControlLabel
                  control={<Radio value="1년이상" onChange={onChangeString} />}
                  label="1년이상"
                />
              </Box>
            </RadioGroup>
          </FormGroup>

          <Typography align="left" variant="h6">
            근무 시간
          </Typography>

          <Stack direction="row" spacing={4}>
            <TextField
              id="time"
              label="시작 시간"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
              name="startTime"
              onChange={onChangeString}
            />
            <Typography align="left" variant="h6">
              ~
            </Typography>
            <TextField
              label="종료 시간"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
              name="endTime"
              onChange={onChangeString}
            />
          </Stack>

          <Typography align="left" variant="h6">
            근무 주소
          </Typography>
          <Modal
            open={isModal}
            onClose={onToggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <DaumPostcode onComplete={onCompletePostAndToggleModal} />
            </Box>
          </Modal>
          <Stack direction="row" spacing={4}>
            <TextField variant="outlined" label="우편 주소" value={zonecode} />
            <Button onClick={onToggleModal}>우편번호 찾기</Button>
          </Stack>
          <TextField
            variant="outlined"
            label="주소"
            name="adress1"
            value={address1}
          />
          <TextField
            variant="outlined"
            label="상세 주소"
            name="adress2"
            onChange={(e) => {
              onChangeAdress(address1, e);
            }}
          />
          <Typography align="left" variant="h6">
            해쉬태그
          </Typography>
          <HashTagClick />

          <Typography align="left" variant="h6">
            모집마감일
          </Typography>
          <TextField
            id="date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            name="deadline"
            onChange={onChangeString}
          />
          <Button variant="contained" onClick={onCreateJob}>
            작성
          </Button>
        </Stack>
      ) : null}
    </Paper>
  );
};

export default JobPostEditor;
