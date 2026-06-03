"use client";
import { Celebration } from "@mui/icons-material";
import { Circle, Cross } from "lucide-react";
import Image from "next/image";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { useReducer, useRef } from "react";

interface ApiResponse {
  success: boolean | null;
  msg: string;
  error: unknown;
  info: SMTPTransport.SentMessageInfo | null;
}
interface Recipients {
  name: string;
  address: string;
}

interface EmailType {
  subject: string | null;
  text: string | null;
  html: string | null;
}

type State = {
  loading: boolean;
  err: string;
  recipients: Recipients[];
  res: ApiResponse;
};

type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERR"; payload: string }
  | { type: "ADD_RECIPIENT"; payload: Recipients }
  | { type: "SET_RES"; payload: ApiResponse };

const initialState: State = {
  loading: false,
  err: "",
  recipients: [],
  res: { success: null, msg: "", error: "", info: null },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERR":
      return { ...state, err: action.payload };
    case "ADD_RECIPIENT":
      return { ...state, recipients: [...state.recipients, action.payload] };
    case "SET_RES":
      return { ...state, res: action.payload };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const emailRef = useRef<EmailType>({
    subject: null,
    text: null,
    html: null,
  });

  function parseRecipients(formData: FormData) {
    const name = formData.get("rname") as string;
    const address = formData.get("raddress") as string;
    if (!name || !address) {
      dispatch({ type: "SET_ERR", payload: "Both Name and address are required !" });
    } else {
      dispatch({ type: "SET_ERR", payload: "" });
      dispatch({ type: "ADD_RECIPIENT", payload: { name, address } });
    }
  }
  function sendMail(e: React.FormEvent) {
    e.preventDefault();
    if (state.recipients.length === 0)
      return dispatch({ type: "SET_ERR", payload: "Please add a recipient to send Email !" });
    if (!emailRef.current.text || !emailRef.current.html)
      return dispatch({ type: "SET_ERR", payload: "Add Some text to Email body to send Email !" });
    if (!emailRef.current.subject) return dispatch({ type: "SET_ERR", payload: "Add a Subject to describe your Email !" });
    dispatch({ type: "SET_LOADING", payload: true });
    fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({ recipients: state.recipients, email: emailRef.current }),
    })
      .then((res) => res.json())
      .then((r) => dispatch({ type: "SET_RES", payload: r }))
      .catch((e) => dispatch({ type: "SET_RES", payload: e }))
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
        (e.target as HTMLFormElement).reset;
      });
  }

  return (
    <main className="w-full flex flex-col items-center justify-center p-10 pt-24 gap-4 font-sans">
      <h1 className="sr-only">
        The Bharat Digital: "Premium Web Development Company that offers SEO
        Audit Tools, e-commerce solutions, IT support & much more for Businesses
        all over the world.
      </h1>
      <h2 className="sr-only">
        Nodemailer - Email Testing Tool for The Bharat Digital
      </h2>
      <p className="text-slate-600 dark:text-gray-400 text-center max-w-xl">
        Test and debug your SMTP email integration with this interactive
        nodemailer demo. Add recipients, compose a subject and message body,
        then send test emails through your configured mail transport. Useful for
        developers building contact forms, notification systems, or
        transactional email workflows.
      </p>
      <div className="w-full flex items-center justify-center gap-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <span className="text-5xl">+</span>
        <Image
          className="dark:invert"
          src="/NodeMailer.png"
          alt="Next.js logo"
          width={80}
          height={17}
          priority
        />
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <section className="max-sm:w-10 sm:w-full h-full bg-indigo-600"></section>
        <section className="w-full flex flex-col gap-2 items-center overflow-hidden">
          <p className="w-full min-h-6 font-bold text-center text-red-500">
             {state.err}
          </p>
          <form
            action={parseRecipients}
            className="w-full flex flex-col items-center gap-2"
          >
            <div className="w-full flex items-center gap-4">
              <label className="w-1/2 flex flex-col gap-1">
                <span className="font-bold">Recipient name : </span>
                <input
                  name="rname"
                  type="text"
                  className="w-full border border-zinc-600 rounded p-1 outline-none"
                />
              </label>
              <label className="w-1/2 flex flex-col gap-1">
                <span className="font-bold">Recipient email : </span>
                <input
                  name="raddress"
                  type="text"
                  className="w-full border border-zinc-600 rounded p-1 outline-none"
                />
              </label>
            </div>
            <button type="submit" className="p-2 rounded bg-indigo-600">
              Add Recipient
            </button>
          </form>
          <div className="w-full min-h-12 flex flex-wrap gap-2 p-1 text-red-500 *:text-xs rounded border border-zinc-600">
            <h2 className={`font-bold text-green-500`}>Recipients :</h2>
            {state.recipients.length === 0 ? (
              <span className="text-red-500">
                ---- No recipients added ----
              </span>
            ) : (
              state.recipients.map((r, i) => (
                <span key={i} className="text-white">
                  {`<${r.name}:${r.address}>` +
                    (state.recipients.length === 1 ? "" : ", ")}
                </span>
              ))
            )}
          </div>
          <form
            onSubmit={sendMail}
            className="w-full flex flex-col items-center gap-2"
          >
            <label className="w-full flex flex-col gap-1">
              <span className="font-bold">Email Subject: </span>
              <input
                onChange={(e) => {
                  emailRef.current = { ...emailRef.current, subject: e.target.value };
                }}
                type="text"
                className="border border-zinc-600 rounded p-1 outline-none"
              />
            </label>
            <label className="w-full flex flex-col gap-1">
              <span className="font-bold">Email body: </span>
              <textarea
                onChange={(e) => {
                  emailRef.current = { ...emailRef.current, text: e.target.value, html: e.target.value };
                }}
                rows={4}
                placeholder="---- Email Body Here ----"
                className="border border-zinc-600 rounded p-2 outline-none placeholder:text-xl placeholder:text-center"
              />
            </label>
            <button type="submit" className="p-2 rounded bg-indigo-600">
              Send E-mail
            </button>
          </form>
          <div className="min-w-1 min-h-10 flex items-center justify-center gap-2">
            {state.loading ? (
              <span className="size-6 aspect-square border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              state.res.success !== null && (
                <>
                  {state.res.success ? (
                    <Circle size={20} className="text-green-500" />
                  ) : (
                    <Cross size={20} className="text-red-500" />
                  )}
                  <span>{state.res.msg}</span>
                  {state.res.success ? (
                    <Celebration fontSize="medium" />
                  ) : (
                    <Cross size={20} className="text-red-500" />
                  )}
                </>
              )
            )}
          </div>
        </section>
        <section className="max-sm:w-10 sm:w-full h-full bg-indigo-600"></section>
      </div>
    </main>
  );
}
