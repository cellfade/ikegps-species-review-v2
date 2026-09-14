import { ExternalLink } from "lucide-react";
import styles from "./identification-help.module.css";

/** Optional reference guidance; opening links never sends captured evidence. */
export function IdentificationHelp() {
  return (
    <details className={styles.help}>
      <summary>Identification help</summary>
      <div className={styles.content}>
        <p><strong>Inspect.</strong> Compare the full photo and detail view. Check the capture date and whether the subject is clear enough to assess.</p>
        <p><strong>Compare.</strong> Consider other matches. Use “Other bird” to reject the suggestion, or “Unknown” when the photo is inconclusive.</p>
        <p><strong>Check nesting separately.</strong> A bird in frame does not prove nesting. Note visible material or activity; request another view if needed.</p>
        <nav className={styles.references} aria-label="Bird identification references">
          <a href="https://merlin.allaboutbirds.org/photo-id/" target="_blank" rel="noreferrer">Merlin Photo ID <ExternalLink size={12} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a>
          <a href="https://www.inaturalist.org/pages/computer_vision_demo" target="_blank" rel="noreferrer">iNaturalist identification <ExternalLink size={12} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a>
        </nav>
        <p className={styles.note}>IKEstrel is a fictional scenario species. These references provide general guidance; they do not verify this finding or authorize work.</p>
      </div>
    </details>
  );
}
