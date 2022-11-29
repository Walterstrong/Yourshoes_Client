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
  /** INITIALIZATIONS **/
  const [value, setValue] = React.useState("1");
  const faq = [
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer:
        " To’lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin!",
    },
    {
      question: "Buyurtmalar qancha vaqtda yetib keladi?",
      answer:
        " Buyurtmalar harid qilgan narsangizga qarab har xil vaqtda yetkazilishi\n" +
        "                                                mumkin. Maximum 1 soat ichida!",
    },
    {
      question:
        "saytdan foydalansam ma'lumotlarim havfsizligiga kafolat bormi?",
      answer:
        "albatta, bizning dasturchilamiz sizning ma'lumotlaringiz havfsizligiga kafolat berishadi",
    },
    {
      question: "saytda muammo yuzaga kelsa kimga murojaat qilaman?",
      answer:
        "Hurmatli mijoz, iltimos adminga xat yo'llash bo'limidan foydalaning",
    },
    {
      question:
        "Men foydalanuvchi emas Biznesmen sifatida faoliyat  yuritmoqchiman. Nima qilishim kerak?",
      answer:
        "Hurmatli mijoz, saytda ko'rsatilgan telefon raqamlarga qo'ng'iroq qilishingizni so'rab qolamiz!",
    },
    {
      question:
        "Men Koreya davlatidaman. O'zbekistondagi oilam uchun Ovqat buyurtma qilmoqchiman. Visa yoki master kartasidan foydalana olamanmi?",
      answer:
        "Albatta, chet eldan turib nafaqat  visa va master balkim paypal dasturidan foydalangan holda buyurtma qilishingiz mumkin! ",
    },
    {
      question:
        "buyurtmani bekor qilmoqchiman lekin buni qanday qilishni bilmayman",
      answer:
        "Buyurtmani bekor qilish uchun Avvalo login qiling va buyurtmalarim bo'limidan kerakli bo'lgan buyurtmangizni bekor qilish tugmasi orqali bekor qilsangiz bo'ladi!",
    },
    {
      question: "Buyurtmani To'lov qilish uchun nima qilishim kerak?",
      answer:
        "Buyurtma uchun to'lovni amalga oshirish uchun login qilishingiz va buyurtmalarim sahifasiga o'tishingiz lozim. Ochilgan sahifadan to'lov qilish tugmasi orqali to'lovni amalga oshira olasiz",
    },
    {
      question: "karta ma'lumotlarimni qayerga kiritaman?",
      answer:
        "Karta ma'lumotlarini Buyurtmalarim sahifasining o'ng tomonida joylashgan maxsus joyga kiritishingiz darkor",
    },
    {
      question:
        "Buyurtmani yakunlagandan so'ng o'zimni fikrimni yozib qoldirishim shartmi?",
      answer:
        "Hurmatli mijoz, sizni fikr qoldirishga majburlamaymiz, lekin fikringiz biz uchun juda qadrli hisoblanadi!",
    },
    {
      question: "Maqola yozishni xohlayman",
      answer:
        "Maqola yozish uchun sahifam bo'limidan maqola yozish tugmasini bossangiz kifoya!",
    },
    {
      question: "Jonli muloqatga men ham qatnasha olamanmi?",
      answer:
        "albatta buning uchun saytimizdan ro'yhatdan o'ting va Jamiyat bo'limidan bemalol foydalanishingiz va o'z fikrlaringizni yozib qoldirishingiz mumkin!",
    },
    {
      question:
        "Biror bir sahifani ko'p kuzatsam uni o'zimni sahifamdan tezda topib olishim uchun nima qilishim kerak?",
      answer:
        "Buning uchun siz kuzatmoqchi bo'lgan foydalanuvchingizda follow bo'lishingiz kifoya qiladi!",
    },
    {
      question: "Sayt rivoji uchun o'z hissamni qo'shmoqchiman",
      answer:
        "Albatta buning uchun adminga xat qoldirishigniz yoki berilgan telefon raqamlariga bog'lansangiz to'liqroq ma'lumot beriladi!",
    },
  ];
  const rules = [
    `Saytdan to'laqonli yani buyurtmalar qilish, jonli
    muloqotlardan foydalanishingiz uchun ro'yxatdan
    o'tishingiz shart.`,
    `Buyurtmalaringizga to'lovni amalga oshirganingizdan so'ng
    bekor qilishning imkoni yo'q shu sababli to'lovlarni
    amalga oshirishdan avval tekshirib oling.`,
    `Jonli muloqot vaqtida bexayo so'zlarni ishlatish mutlaqo
    taqiqlanadi.`,
    `Shaxsiy reklamalarni adminning ruxsatisiz yozish va
    tarqatish mumkun emas.`,
    `Maqolalaringiz odob doirasidan chiqib ketmasligi shart.`,
    `Barcha xarakatlaringiz adminlarimiz nazorati ostida
    bo'lani sabab iltimos talablarimizni xurmat qiling.`,
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
                <Tab label="Qoidalar" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="Adminga xat" value={"3"} />
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
                      <span>Adminga Xabar Qoldirish</span>
                      <p>
                        Assalomu alaykum! Adminga xabar qoldirish uchun pasdagi
                        formlarni to’ldiring!{" "}
                      </p>
                    </Box>
                    <form
                      action={"#"}
                      method={"POST"}
                      className={"admin_letter_frame"}
                    >
                      <div className={"admin_input_box"}>
                        <label>Ism</label>
                        <input
                          type={"text"}
                          name={"mb_nick"}
                          placeholder={"Ism"}
                        />
                      </div>
                      <div className={"admin_input_box"}>
                        <label>Elektron Manzil</label>
                        <input
                          type={"text"}
                          name={"mb_email"}
                          placeholder={"Elektron Manzil"}
                        />
                      </div>
                      <div className={"admin_input_box"}>
                        <label>Xabar</label>
                        <textarea
                          name={"mb_msg"}
                          placeholder={"Xabar"}
                        ></textarea>
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "30px" }}
                      >
                        <Button type={"submit"} variant="contained">
                          Jo'natish
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
