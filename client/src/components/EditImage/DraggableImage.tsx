import * as React from "react";
import {
  makeMoveable,
  DraggableProps,
  ScalableProps,
  RotatableProps,
  Rotatable,
  Draggable,
  Scalable,
} from "react-moveable";
import MoveableHelper from "moveable-helper";
import { flushSync } from "react-dom";
import Loader from "../../assets/Loader";

const Moveable = makeMoveable<DraggableProps & ScalableProps & RotatableProps>([
  Draggable,
  Scalable,
  Rotatable,
]);

export default function TreeShakingApp({
  src,
  className,
  loading,
}: {
  src: string;
  className: string;
  loading: boolean;
}) {
  const [helper] = React.useState(() => {
    return new MoveableHelper();
  });
  const targetRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className={className}>
      <div ref={targetRef} className={src ? "w-[90%]" : "w-[400px] h-[400px]"}>
        {src ? (
          <img
            src={src}
            alt=""
            className={`shadow-custom2 ${loading ? "animate-pulse" : ""}`}
            onResize={(e) => {
              console.log(e);
            }}
          />
        ) : (
          <div className="bg-white w-[400px] h-[400px] z-20 flex justify-center items-center">
            <Loader className="w-14 h-14" />
          </div>
        )}
      </div>

      <Moveable
        flushSync={flushSync}
        target={targetRef}
        draggable={true}
        scalable={true}
        onDragStart={helper.onDragStart}
        onDrag={helper.onDrag}
        onScaleStart={helper.onScaleStart}
        onScale={helper.onScale}
        onRotateStart={helper.onRotateStart}
        onRotate={helper.onRotate}
      />
    </div>
  );
}
