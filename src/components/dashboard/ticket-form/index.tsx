"use client";
import { useState } from "react";
import {
  Input,
  Label,
  Button,
  Textarea,
  Sheet,
  SheetTrigger,
  SheetContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui";
import { TicketType, TicketStatus } from "@/lib/types";
import axios from "axios";

const Field = ({ name, value, onChange, isTextArea }: any) => {
  if (isTextArea) {
    return (
      <div className="flex flex-row items-center justify-between py-3 px-3">
        <Label htmlFor={name} className="pr-3">
          {name}
        </Label>
        <Textarea
          id={name}
          placeholder={name}
          value={value}
          onChange={(val) => onChange(val.target.value)}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-row items-center justify-between py-3 px-3">
      <Label htmlFor={name} className="pr-3">
        {name}
      </Label>
      <Input
        id={name}
        type="text"
        placeholder={name}
        value={value}
        onChange={(val) => onChange(val.target.value)}
      />
    </div>
  );
};

const TicketForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<TicketType>(TicketType.TUTORING);
  const [contact_name, setContactName] = useState<string>("");
  const [contact_email, setContactEmail] = useState<string>("");
  const [contact_phone, setContactPhone] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [showSheet, setShowSheet] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const tickets = await axios.post(`${location.origin}/api/tickets`, {
        title,
        description,
        type,
        status: TicketStatus.OPEN,
        contact_name,
        contact_email,
        contact_phone,
        assigned_to: null,
        due_date: null,
      });
      if (tickets.status === 200) {
        setTitle("");
        setDescription("");
        setType(TicketType.OTHER);
        setContactName("");
        setContactEmail("");
        setContactPhone("");
      } else {
        setError("Failed to create ticket");
      }
    } catch (err: any) {
      setError(err?.message);
    }
    setLoading(false);
    setShowSheet(false);
  };

  return (
    <>
      <Sheet open={showSheet} onOpenChange={() => setShowSheet(!showSheet)}>
        <SheetTrigger>
          <Button variant="secondary" onClick={() => setShowSheet(true)}>Create Ticket</Button>
        </SheetTrigger>
        <SheetContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center  py-3 px-3">
              <p className="text-lg">Contact Info</p>
              <Field
                name="Contact Name"
                value={contact_name}
                onChange={setContactName}
              />
              <Field
                name="Contact Email"
                value={contact_email}
                onChange={setContactEmail}
              />
              <Field
                name="Contact Phone"
                value={contact_phone}
                onChange={setContactPhone}
              />
              <br />
              <p className="text-lg">Ticket Details</p>
              <Field name="Title" value={title} onChange={setTitle} />
              <Field
                name="Description"
                value={description}
                onChange={setDescription}
                isTextArea
              />
              <div className="flex flex-row items-center justify-between py-3 px-3">
                <Label htmlFor="type" className="pr-3">
                  Type
                </Label>
                <Select
                  onValueChange={(val) => setType(val as TicketType)}
                  value={type as string}
                  name="Ticket Type"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TicketType.TUTORING}>
                      Tutoring
                    </SelectItem>
                    <SelectItem value={TicketType.WEB_DEVELOPMENT}>
                      Web Development
                    </SelectItem>
                    <SelectItem value={TicketType.MOBILE_DEVELOPMENT}>
                      Mobile Development
                    </SelectItem>
                    <SelectItem value={TicketType.CONSULTANCY}>
                      Consultancy
                    </SelectItem>
                    <SelectItem value={TicketType.OTHER}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <br />
              <Button type="submit" disabled={loading}>
                Create Ticket
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};
export { TicketForm };
