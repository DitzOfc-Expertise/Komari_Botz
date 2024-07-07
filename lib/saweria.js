const qrcode = require("qrcode");
const cheerio = require("cheerio");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
moment.tz.setDefault("Asia/Jakarta");

class Saweria {
  constructor(user_id) {
    this.user_id = user_id;
    this.baseUrl = "https://saweria.co";
    this.apiUrl = "https://backend.saweria.co";
  }

  login = async (email, password) => {
    try {
      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const { data } = await response.json();

      if (!data || !data.id) {
        return {
          creator: "Bang syaii",
          status: false,
          msg: "Failed to login",
        };
      }

      return {
        creator: "Bang syaii",
        status: true,
        data: {
          user_id: data.id,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        creator: "Bang syaii",
        status: false,
        msg: error.message,
      };
    }
  };

  createQr = async (amount, msg = "Order") => {
    try {
      if (amount < 1000) {
        return {
          creator: "Bang syaii",
          status: false,
          msg: "Minimum Deposit 1.000",
        };
      }
      if (!this.user_id) {
        return {
          creator: "Bang syaii",
          status: false,
          msg: "USER ID NOT FOUND",
        };
      }

      const response = await fetch(`${this.apiUrl}/donations/${this.user_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agree: true,
          amount: Number(amount),
          customer_info: {
            first_name: "Payment Gateway",
            email: "gateway@nomisec07.tech",
            phone: "",
          },
          message: msg,
          notUnderAge: true,
          payment_type: "qris",
          vote: "",
        }),
      });

      const { data } = await response.json();

      if (!data || !data.id) {
        return {
          creator: "Bang syaii",
          status: false,
          msg: "Failed to create payment",
        };
      }

      const qr_string = data.qr_string;
      const qr_image = await qrcode.toDataURL(qr_string, {
        scale: 8,
      });

      return {
        creator: "Bang syaii",
        status: true,
        data: {
          ...data,
          expired_at: moment(data.created_at)
            .add(10, "minutes")
            .format("DD/MM/YYYY HH:mm:ss"),
          receipt: `${this.baseUrl}/qris/${data.id}`,
          url: `${this.baseUrl}/qris/${data.id}`,
          qr_image: qr_image,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        creator: "Bang syaii",
        status: false,
        msg: error.message,
      };
    }
  };

  cekPay = async (id) => {
    try {
      if (!this.user_id) {
        return {
          creator: "",
          status: false,
          msg: "USER ID NOT FOUND",
        };
      }

      const response = await fetch(`${this.baseUrl}/receipt/${id}`, {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });

      const text = await response.text();
      const $ = cheerio.load(text);
      const msg = $("h2.chakra-heading.css-14dtuui").text();

      if (!msg) {
        return {
          creator: "Bang syaii",
          status: false,
          msg: "PENDING",
        };
      }

      const status = msg.toLowerCase() === "berhasil";
      return {
        creator: "Bang syaii",
        status: true,
        msg: "SUCCESS",
        url: `${this.baseUrl}/receipt/${id}`,
      };
    } catch (error) {
      console.log(error);
      return {
        creator: "Bang syaii",
        status: false,
        msg: error.message,
      };
    }
  };
}

module.exports = { Saweria };
