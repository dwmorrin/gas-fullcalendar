import modal from "./modal";
import { heading } from "./html";

/**
 * @param {FCResource} resource
 */
export default function resourceModal(resource) {
  console.log(resource);
  return modal({
    children: [heading(resource.title)],
  });
}
