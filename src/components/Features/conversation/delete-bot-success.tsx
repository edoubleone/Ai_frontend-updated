import success from "@/assets/icons/success.svg";
import Button from "@/components/shared/button";

const DeleteBotSuccess = () => {
  return (
    <div className="py-12 px-8 border flex flex-col items-center bg-white w-full max-w-[455px] rounded-2xl">
      <img src={success} alt="Success" />
      <div className="flex mt-5 text-center flex-col">
        <h1 className="text-2xl font-bold text-[#171717]">Bot Deleted!</h1>
        <p className="text-base text-[#454545]">
          Conversation Successfully deleted.
        </p>
      </div>

      <Button className="mt-10">Okay</Button>
    </div>
  );
};

export default DeleteBotSuccess;
