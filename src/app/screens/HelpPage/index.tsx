import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import "../../../css/help.css";
import { Box, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SettingsIcon from "@mui/icons-material/Settings";
import { RuleSharp } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export function HelpPage() {
  /** INITIALIZATIONS **/
  const [value, setValue] = React.useState("1");

  const faq = [
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday usulda amalga oshiriladi",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
  ];
  const rules = [
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem maxime
      esse aliquid neque nesciunt, sint molestiae animi eos corporis doloribus.
      Alias quis nobis libero totam ullam quod perspiciatis debitis obcaecati
    `,
    ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem maxime
      esse aliquid neque nesciunt, sint molestiae animi eos corporis doloribus.
      Alias quis nobis libero totam ullam quod perspiciatis debitis obcaecat`,
  ];

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="help_page">
      <Container sx={{ mt: "50px", mb: "50px" }}>
        <TabContext value={value}>
          <Box className="help_menu">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                value={value}
                onChange={handleChange}
                aria-label="lab API tabs expample"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  fontSize: "50px",
                }}
              >
                <Tab
                  label="Qoidalar"
                  value={"1"}
                  style={{
                    marginRight: "250px",
                  }}
                />
                <Tab
                  label="FAQ"
                  value={"2"}
                  style={{
                    marginRight: "250px",
                  }}
                />
                <Tab
                  label="Adminga xat"
                  value={"3"}
                  style={{
                    marginLeft: "80px",
                  }}
                />
              </TabList>
            </Box>
          </Box>
          <Stack className="help_main_content">
            <TabPanel value={"1"}>
              <Stack className="theRules_box">
                <Box className="theRulesFrame">
                  {rules.map((ele, number) => {
                    return <p>{ele}</p>;
                  })}
                </Box>
              </Stack>
            </TabPanel>
            <TabPanel value={"2"}>
              <Stack className="accordian_menu">
                {faq.map((ele, number) => {
                  return (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panelia-content"
                        id="panelia-header"
                      >
                        <Typography>{ele.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{ele.answer}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Stack>
            </TabPanel>
            <TabPanel value={"3"}>
              <Stack className="admin_letter_box">
                <Stack className="admin_letter_container">
                  <Box className="admin_letter_frame">
                    <span>Adminga Xabar Qoldirish</span>
                    <p>
                      Assalamu alaykum! Adminga xabar qoldirish uchun quyidagi
                      formalarni to'ldiring
                    </p>
                  </Box>
                  <form action="#" method="POST" className="admin_letter_frame">
                    <div className="admin_input_box">
                      <label>Ism</label>
                      <input type="text" name="mb_nick" placeholder="Ism" />
                    </div>
                    <div className="admin_input_box">
                      <label>Elektron manzil</label>
                      <input
                        type="text"
                        name="mb_email"
                        placeholder="Elektron manzil"
                      />
                    </div>
                    <div className="admin_input_box">
                      <label>Xabar</label>
                      <textarea name="mb_msg" placeholder="Xabar"></textarea>
                    </div>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ mt: "30px" }}
                    >
                      <Button type="submit" variant="contained">
                        Jo'natish
                      </Button>
                    </Box>
                  </form>
                </Stack>
              </Stack>
            </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
