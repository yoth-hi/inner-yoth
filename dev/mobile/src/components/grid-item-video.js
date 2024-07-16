import"./grid-item-video.css"
import ThumbnailOverlay from "./thambnail-overlay.js"
export default function({
  data = {}
}) {
  return (
    <>
    <div className="grid-item-video">
      <a aria-hidden="true" className="media-item-thumbnail-container" href="/watch?v=cR5np20enOw">
        <div className="video-thumbnail-container-large">
          <div className="cover video-thumbnail-img video-thumbnail-bg"></div>
          <img className="cover video-thumbnail-img" alt="" src="" />
          <div className="video-preview-shim"></div>
          <div className="video-thumbnail-overlay-time">
            <ThumbnailOverlay data={data?.thumbnailOverlays} />
          </div>
        </div>
      </a>
      <div className="details">
        <div className="media-channel-image">
          <a href={data.owner?.endpoint?.url} className="media-channel-image-endpoint">
            <img alt="" src="" />
          </a>
          <a className="media-item-extra-endpoint" aria-hidden="true" href="/watch?v=cR5np20enOw"></a>
        </div>
      <div className="media-item-details">
        <div className="video-item-metadata">
          <a href="/watch?v=cR5np20enOw">
            <h3 className="video-item-title">
              <span aria-label={data.accessibility?.label} role="text">{data.title}</span>
            </h3>
            <div className="">
              <span className="sub-metadata-media-text" dir="auto" aria-hidden="true">
                <span>{data.owner?.title}</span>
              </span>
              <span className="sub-metadata-media-text-separator" aria-hidden="true">•</span>
              <span className="sub-metadata-media-text" dir="auto" aria-hidden="true">
                <span aria-label={data.viewCount?.text} role="text">{data.viewCount?.text}</span>
              </span>
              <span className="sub-metadata-media-text-separator" aria-hidden="true">•</span>
              <span className="sub-metadata-media-text" dir="auto" aria-hidden="true">
                <span role="text">---</span>
              </span>
            </div>
          </a>
        </div>
        <button className="video-item-menu" aria-label="Action menu" title="">
          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
        </button>
      </div>
    </div>
  </div>
</>
)
}