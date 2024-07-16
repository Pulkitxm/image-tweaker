import { useRecoilState } from "recoil";
import { deleteImageConfigState } from "../../state/image";
import Delete from "./Delete";

export default function DeleteImage() {
  const [deleteImageConfig, setDeleteImageConfig] = useRecoilState(
    deleteImageConfigState
  );
  if (deleteImageConfig.open && deleteImageConfig.imageId)
    return (
      <div className="w-screen h-screen fixed bg-[#0000004d] top-0 left-0 z-20 flex justify-center items-center">
        <Delete
          deleteImageConfig={deleteImageConfig}
          setDeleteImageConfig={setDeleteImageConfig}
        />
      </div>
    );
}
