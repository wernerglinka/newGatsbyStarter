import { useState, useEffect } from "react";

/**
 * hook to toogle a modal
 * to allow the modal to fade out gracefully the class "modalClosing" is added
 * to the element "modalContainer". This triggers a css opacity transition from 1 to 0.
 * A timeout that matches the css transition time is used to close the modal.
 * The fadein is implemented with a simple opacity css transition from 0 to 1
 *
 */
function ModalToggle() {
  const [delayHide, setDelayHide] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const hide = () => setDelayHide(true);
  const hideNow = () => setIsShown(false);
  const show = () => setIsShown(true);

  useEffect(() => {
    // add modalActive class to body to prevent page scroll under modal
    if (isShown) {
      document.body.classList.add("modalActive");
    } else {
      document.body.classList.remove("modalActive");
    }
  }, [isShown]);

  useEffect(() => {
    if (delayHide) {
      document.querySelector("#modal-root > div").classList.add("modalClosing");
      // document.getElementById("modalContainer").classList.add("modalClosing");
      setTimeout(function() {
        hideNow();
      }, 300);
    }
    return setDelayHide(false);
  }, [delayHide]);

  return { isShown, hide, show };
}

export default ModalToggle;
