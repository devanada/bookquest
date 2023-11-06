import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

const RiveWrapper = () => {
  const { RiveComponent } = useRive({
    src: "loading-book.riv",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return <RiveComponent />;
};

export default RiveWrapper;
