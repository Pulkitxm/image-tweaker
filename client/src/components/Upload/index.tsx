import { useRecoilState } from "recoil";
import { openUploadDialogState } from "../../state/image";
import UploadFile from "./UploadFile";

export default function UploadDialog() {
  const [open, setOpen] = useRecoilState(openUploadDialogState);
  if (open)
    return (
      <div className="w-screen h-screen fixed bg-[#0000004d] top-0 left-0 z-20 flex justify-center items-center">
        <UploadFile setOpen={setOpen} open={open} />
      </div>
    );
}
