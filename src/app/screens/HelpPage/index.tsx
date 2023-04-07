import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";

export function HelpPage() {
  /** INITIALIZATIONSS **/
  const [value, setValue] = React.useState("1");
  const faq = [
    {
      question: "How the payment is made?",
      answer:
        "You can make the payment through the Paypal and Master or Visa Card applications!",
    },
    {
      question: "How long does it take for orders to arrive?",
      answer:
        "Orders may be delivered at different times depending on what you have purchased. Maximum within 2 days!",
    },
    {
      question:
        "Is there a guarantee that my data will be safe if I use the website?",
      answer: "Of course, our developers guarantee that your data is safe",
    },
    {
      question: "Who do I contact if I have a problem with the website?",
      answer: "Dear customer, please use the mail admin section",
    },
    {
      question: "I want to act as a businessman, not a user. What should I do?",
      answer:
        "Dear customer, we ask you to call the telephone numbers indicated on the website!",
    },
    {
      question:
        "I am in South Korea. I want to shoes for my family in Uzbekistan. Do you deliver to Uzbekistan?",
      answer:
        "Unfortunately, we don't deliver our products outside of South Korea, soon We will orginize it! ",
    },
    {
      question: "I want to cancel the order but I don't know how to do it",
      answer:
        "To cancel an order, please log in first and cancel your order by clicking the cancel button in the My Orders section.!",
    },
    {
      question: "What do I need to do to pay for my order?",
      answer:
        "To pay for an order, you must log in and go to the My Orders page. You can make a payment through the payment button on the opened page",
    },
    {
      question: "Where do i enter my card details?",
      answer:
        "You must enter your card details in the special place on the right side of the My Orders page",
    },
    {
      question: "Do I have to leave a review after completing the order?",
      answer:
        "Dear customer, we do not force you to leave feedback, but your opinion is very valuable to us!",
    },
    {
      question: "I want to write an article",
      answer:
        "To write an article, just click the write article button from the section of my page!",
    },
    {
      question: "Can I also attend the live chat??",
      answer:
        "Of course, you can register on our site and feel free to use the Community section and leave your comments.!",
    },
    {
      question:
        "What should I do so that I can find myself on my page quickly if I visit a page a lot?",
      answer: "For this, it is enough to follow the user you want to follow!",
    },
    {
      question: "I would like to contribute to the development of the website",
      answer:
        "Of course, if you leave a letter to the admin or contact the given phone numbers, more detailed information will be provided!",
    },
  ];
  const rules = [
    `Making orders from the site is complete, live
    register to use communications
    you must pass.`,
    `Once you have paid for your orders
    It is not possible to cancel the payments for this reason
    check before doing.`,
    `Using profanity during live chat is absolutely fine
    is prohibited.`,
    `Writing personal ads without admin permission and
    cannot be distributed`,
    `Your articles must not go beyond the bounds of decency.`,
    `All your actions are under the control of our admins
    Please respect our requests.`,
  ];

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"help_page"}>
      <Container sx={{ mt: "50px", mb: "50px" }}>
        <TabContext value={value}>
          <Box className={"help_menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                value={value}
                onChange={handleChange}
                aria-label="lab API tabs example"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Tab className="tab_font" label="Rules" value={"1"} />
                <Tab
                  className="tab_font"
                  label="Letter to Admin"
                  value={"3"}
                />{" "}
                <Tab className="tab_font" label="FAQ" value={"2"} />
              </TabList>
            </Box>
          </Box>
          <Stack>
            <Stack className={"help_main_content"}>
              <TabPanel value={"1"}>
                <Stack className={"theRules_box"}>
                  <Box className={"theRulesFrame"}>
                    {rules.map((ele) => {
                      return <p>{ele}</p>;
                    })}
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={"2"}>
                <Stack className={"accordian_menu"}>
                  {faq.map((ele) => {
                    return (
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
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
                <Stack className={"admin_letter_box"}>
                  <Stack className={"admin_letter_container"}>
                    <Box className={"admin_letter_frame"}>
                      <span>Letter for Admin</span>
                      <p>
                        Welcome! If you would like to write a letter for Admin,
                        Please complete below form! Thank you 😊 😊 😊
                      </p>
                    </Box>
                    <form
                      action={"#"}
                      method={"POST"}
                      className={"admin_letter_frame"}
                    >
                      <div className={"admin_input_box"}>
                        <label>Name</label>
                        <input
                          type={"text"}
                          name={"mb_nick"}
                          placeholder={"Name"}
                        />
                      </div>
                      <div className={"admin_input_box"}>
                        <label>Email address</label>
                        <input
                          type={"text"}
                          name={"mb_email"}
                          placeholder={"Email address"}
                        />
                      </div>
                      <div className={"admin_input_box"}>
                        <label>Letter</label>
                        <textarea
                          name={"mb_msg"}
                          placeholder={"Letter"}
                        ></textarea>
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "30px" }}
                      >
                        <Button type={"submit"} variant="contained">
                          Send
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
