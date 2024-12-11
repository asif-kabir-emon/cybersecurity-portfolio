import React from "react";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import Image from "next/image";
import LinkedIn from "@/assets/icons/linkedin.png";
import Github from "@/assets/icons/github.png";
import WhatsApp from "@/assets/icons/whatsapp.png";
import Telegram from "@/assets/icons/telegram.png";
import Twitter from "@/assets/icons/twitter.png";
import YouTube from "@/assets/icons/youtube.png";
import Email from "@/assets/icons/email.png";
import Phone from "@/assets/icons/call.png";
import Address from "@/assets/icons/address.png";
import { Pencil } from "lucide-react";
import UpdateProfileInfo from "./UpdateInfo";

const ContactInfo = ({
  profileId,
  profileData,
}: {
  profileId: string;
  profileData: {
    name: string;
    title: string;
    bio: string;
    contactInfo?: {
      email: string;
      phone: string;
      address: string;
      github: string;
      linkedin: string;
      whatsapp: string;
      telegram: string;
      twitter: string;
      youtube: string;
    };
  };
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button
        className="text-black underline cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Contact Info
      </button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title={profileData.name}
        description=""
        size="45%"
        heightAuto={true}
      >
        <div>
          <div className="w-full flex justify-between mb-1">
            <h3 className="text-xl font-semibold">Contact Info</h3>
            <button className="text-black hover:bg-slate-200 p-1 rounded-full cursor-pointer">
              <UpdateProfileInfo
                profileId={profileId}
                profileData={profileData}
              />
            </button>
          </div>
          <div className="space-y-4">
            {profileData.contactInfo?.email &&
              profileData.contactInfo?.email !== "" && (
                <div className="flex gap-4">
                  <Image
                    src={Email}
                    width={20}
                    height={20}
                    alt="email"
                    className="w-5 h-5 mt-[3px]"
                  />
                  <div>
                    <h4 className="text-[18px] mb-[2px]">Email</h4>
                    <div>{profileData.contactInfo.email}</div>
                  </div>
                </div>
              )}
            {profileData.contactInfo?.phone &&
              profileData.contactInfo?.phone !== "" && (
                <div className="flex gap-4">
                  <Image
                    src={Phone}
                    width={20}
                    height={20}
                    alt="phone"
                    className="w-5 h-5 mt-[3px]"
                  />
                  <div>
                    <h4 className="text-[18px] mb-[2px]">Phone</h4>
                    <div>{profileData.contactInfo.phone}</div>
                  </div>
                </div>
              )}
            {profileData.contactInfo?.address &&
              profileData.contactInfo?.address !== "" && (
                <div className="flex gap-4">
                  <Image
                    src={Address}
                    width={20}
                    height={20}
                    alt="address"
                    className="w-5 h-5 mt-[3px]"
                  />
                  <div>
                    <h4 className="text-[18px] mb-[2px]">Address</h4>
                    <div>{profileData.contactInfo.address}</div>
                  </div>
                </div>
              )}
            {profileData.contactInfo?.linkedin &&
              profileData.contactInfo?.linkedin !== "" && (
                <div className="flex gap-4">
                  <Image
                    src={LinkedIn}
                    width={20}
                    height={20}
                    alt="linkedin"
                    className="w-5 h-5 mt-[3px]"
                  />
                  <div>
                    <h4 className="text-[18px] mb-[2px]">LinkedIn</h4>
                    <a
                      href={profileData.contactInfo.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className=" hover:underline hover:cursor-pointer"
                    >
                      {profileData.contactInfo.linkedin
                        .split("https://www.")[1]
                        .split("/")
                        .join("/")}
                    </a>
                  </div>
                </div>
              )}
            {profileData.contactInfo?.github &&
              profileData.contactInfo?.github !== "" && (
                <div className="flex gap-4">
                  <Image
                    src={Github}
                    width={20}
                    height={20}
                    alt="github"
                    className="w-5 h-5 mt-[3px]"
                  />
                  <div>
                    <h4 className="text-[18px] mb-[2px]">Github</h4>
                    <a
                      href={profileData.contactInfo.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className=" hover:underline hover:cursor-pointer"
                    >
                      {profileData.contactInfo.github
                        .split("https://")[1]
                        .split("/")
                        .join("/")}
                    </a>
                  </div>
                </div>
              )}
            {profileData.contactInfo?.whatsapp &&
              profileData.contactInfo?.whatsapp !== "" && (
                <div className="flex gap-4">
                  <Image
                    src={WhatsApp}
                    width={20}
                    height={20}
                    alt="whatsapp"
                    className="w-5 h-5 mt-[3px]"
                  />
                  <div>
                    <h4 className="text-[18px] mb-[2px]">Whatsapp</h4>
                    <a
                      href={`https://wa.me/${profileData.contactInfo?.whatsapp}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className=" hover:underline hover:cursor-pointer"
                    >
                      {profileData.contactInfo.whatsapp}
                    </a>
                  </div>
                </div>
              )}
            {profileData.contactInfo?.telegram &&
              profileData.contactInfo?.telegram !== "" && (
                <div className="flex gap-4">
                  <Image
                    src={Telegram}
                    width={20}
                    height={20}
                    alt="telegram"
                    className="w-5 h-5 mt-[3px]"
                  />
                  <div>
                    <h4 className="text-[18px] mb-[2px]">Telegram</h4>
                    <a
                      href={`https://t.me/${profileData.contactInfo?.telegram}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className=" hover:underline hover:cursor-pointer"
                    >
                      {profileData.contactInfo.telegram}
                    </a>
                  </div>
                </div>
              )}
            {profileData.contactInfo?.twitter &&
              profileData.contactInfo?.twitter !== "" && (
                <div className="flex gap-4">
                  <Image
                    src={Twitter}
                    width={20}
                    height={20}
                    alt="twitter"
                    className="w-5 h-5 mt-[3px]"
                  />
                  <div>
                    <h4 className="text-[18px] mb-[2px]">Twitter</h4>
                    <a
                      href={`https://t.me/${profileData.contactInfo?.twitter}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className=" hover:underline hover:cursor-pointer"
                    >
                      {profileData.contactInfo.twitter
                        .split("https://x.com/")[1]
                        .split("/")
                        .join("/")}
                    </a>
                  </div>
                </div>
              )}
            {profileData.contactInfo?.youtube &&
              profileData.contactInfo?.youtube !== "" && (
                <div className="flex gap-4">
                  <Image
                    src={YouTube}
                    width={20}
                    height={20}
                    alt="youtube"
                    className="w-6 h-6"
                  />
                  <div>
                    <h4 className="text-[18px] mb-[2px]">YouTube</h4>
                    <a
                      href={`https://t.me/${profileData.contactInfo?.youtube}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className=" hover:underline hover:cursor-pointer"
                    >
                      {profileData.contactInfo.youtube
                        .split("https://www.youtube.com/")[1]
                        .split("/")
                        .join("/")}
                    </a>
                  </div>
                </div>
              )}
          </div>
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default ContactInfo;
