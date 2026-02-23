import styles from "./NewsSection.module.css";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9.89859" cy="1.41437" r="1" transform="rotate(135 9.89859 1.41437)" fill="currentColor" />
      <circle cx="5.6564" cy="1.41437" r="1" transform="rotate(135 5.6564 1.41437)" fill="currentColor" />
      <circle cx="1.41422" cy="1.41437" r="1" transform="rotate(135 1.41422 1.41437)" fill="currentColor" />
      <circle cx="7.7775" cy="3.53546" r="1" transform="rotate(135 7.7775 3.53546)" fill="currentColor" />
      <circle cx="5.6564" cy="5.65655" r="1" transform="rotate(135 5.6564 5.65655)" fill="currentColor" />
      <circle cx="9.89859" cy="5.65655" r="1" transform="rotate(135 9.89859 5.65655)" fill="currentColor" />
      <circle cx="9.89859" cy="9.89874" r="1" transform="rotate(135 9.89859 9.89874)" fill="currentColor" />
      <circle cx="3.53531" cy="7.77765" r="1" transform="rotate(135 3.53531 7.77765)" fill="currentColor" />
      <circle cx="1.41422" cy="9.89874" r="1" transform="rotate(135 1.41422 9.89874)" fill="currentColor" />
    </svg>
  );
}

export default function NewsSection() {
  return (
    <section className={styles.homeNews}>
      {/* Title and copy */}
      <div className="grid-container">
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Latest Updates</h2>
        </div>
        <div className={styles.copyWrapper}>
          <p className={styles.sectionCopy}>
            Stay up to date with the latest product launches, partnerships, and
            industry coverage. Our newsroom highlights the milestones shaping
            Microtex International and the markets we serve.
          </p>
        </div>
      </div>

      {/* Featured posts */}
      <div className={`grid-container ${styles.featuredItemsContainer}`}>
        <div className={styles.featuredItems}>
          {/* Featured Post 1 */}
          <div className={styles.featuredPost}>
            <article className={styles.postCard}>
              <div className={styles.postImageWrapper}>
                <img
                  src="https://a.storyblok.com/f/288034353253643/1480x828/55b44bd5c3/on.avif/m/1168x654/filters:format(jpeg):quality(70)"
                  alt="Microtex Launches Next-Generation Wrapper Machine"
                />
              </div>
              <div className={styles.postContent}>
                <div className={styles.postHead}>
                  <span>Product Launch</span>
                  <span> January 15, 2026</span>
                </div>
                <div className={styles.postCopyWrapper}>
                  <h3 className={styles.postTitle}>
                    Microtex Launches Next-Generation Wrapper Machine
                    MTI-W200-2
                  </h3>
                  <p className={styles.postExcerpt}>
                    The latest evolution of our flagship wrapper machine delivers
                    higher throughput, improved precision, and reduced downtime
                    for demanding production environments...
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* Featured Post 2 */}
          <div className={styles.featuredPost}>
            <article className={styles.postCard}>
              <div className={styles.postImageWrapper}>
                <img
                  src="https://a.storyblok.com/f/288034353253643/666x392/679d489e35/articlenovember.avif/m/1168x688/filters:format(jpeg):quality(70)"
                  alt="Microtex Expands SAIF Zone Manufacturing Facility"
                />
              </div>
              <div className={styles.postContent}>
                <div className={styles.postHead}>
                  <span>Company News</span>
                  <span> December 5, 2025</span>
                </div>
                <div className={styles.postCopyWrapper}>
                  <h3 className={styles.postTitle}>
                    Microtex Expands SAIF Zone Manufacturing Facility to
                    Meet Growing Demand
                  </h3>
                  <p className={styles.postExcerpt}>
                    Our expanded manufacturing facility in Sharjah&apos;s SAIF Zone
                    doubles production capacity, enabling faster delivery and
                    enhanced quality control...
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* News list */}
      <div className={`grid-container ${styles.listSection}`}>
        <div className={styles.rows}>
          {/* Row 1 */}
          <div className={styles.row}>
            <span className={styles.rowTitle}>
              Microtex International Partners with Leading Confectionery
              Manufacturer for Turnkey Packaging Line
            </span>
            <div className={styles.rowCopyWrapper}>
              <div className={styles.rowCopy}>November 20, 2025</div>
              <div className={styles.rowLink}>
                Read more
                <div className={styles.rowLinkButton}>
                  <ArrowIcon />
                </div>
              </div>
            </div>
            <div className={styles.rowImageWrapper}>
              <img
                src="https://a.storyblok.com/f/288034353253643/1480x914/7d9f9798b5/article.avif/m/366x226/filters:format(jpeg):quality(70)"
                alt="Microtex Partnership"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className={styles.row}>
            <span className={styles.rowTitle}>
              New High Speed Boxer MTI-HSB30-1 Achieves Record Output in
              Factory Trials
            </span>
            <div className={styles.rowCopyWrapper}>
              <div className={styles.rowCopy}>October 10, 2025</div>
              <div className={styles.rowLink}>
                Read more
                <div className={styles.rowLinkButton}>
                  <ArrowIcon />
                </div>
              </div>
            </div>
            <div className={styles.rowImageWrapper}>
              <img
                src="https://a.storyblok.com/f/288034353253643/742x378/82350889c0/on.avif/m/366x186/filters:format(jpeg):quality(70)"
                alt="High Speed Boxer launch"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
