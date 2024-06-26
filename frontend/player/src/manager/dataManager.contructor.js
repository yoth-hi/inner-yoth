export const ConstructorObjectData = function (scopeData, data = {}) {
    const store = scopeData.__store ?? {};
    const { response = store } = data;
    const { videoDetails } = response;
    if (videoDetails) {
        if (videoDetails.title) {
            store.title = videoDetails.title;
            scopeData.title = videoDetails.title;
        }
        if (videoDetails.lengthSeconds) {
            store.lengthSeconds = videoDetails.lengthSeconds;
            scopeData.lengthSeconds = Number(videoDetails.lengthSeconds);
        }
        if (videoDetails.author) {
            store.author = videoDetails.author;
            scopeData.author = videoDetails.author;
        }
        if (videoDetails.videoId) {
            store.videoId = videoDetails.videoId;
            scopeData.videoId = videoDetails.videoId;
        }
        if (null !== videoDetails.isPrivate) {
            scopeData.isPrivate = videoDetails.isPrivate;
        }
        if (null !== videoDetails.isLive) {
            scopeData.isLivePlayback = !!videoDetails.isLive;
        }
    }
    scopeData._playerResponse = response;
    return (scopeData.__store = store);
};
