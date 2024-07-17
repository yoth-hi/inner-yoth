const canUseNextButton = function(api){
  if(api.getPresentingPlayerType() == 3){
    return false
  }
  return true
}



export const updateButtonNextOrBack = function(a) {
  var b = {
    duration: null,
    preview: null,
    text: null,
    title: null,
    url: null,
    "data-title-no-tooltip": null,
    "aria-keyshortcuts": null
  }
  /*
  c = a.playlist != null && a.playlist.rl(); 
  c = g.BT(a.J) && (!a._isNext || c); 
  */
  const d = a._isNext && canUseNextButton(a._api);
  /*
  e = M3a(a),
  */
  const f = a._isNext && a._api.getPresentingPlayerType() === 5;
  /*
  h = g.wT(a.J, "Pr\u00f3ximo", "SHIFT+n"),
  l = g.wT(a.J, "Anterior", "SHIFT+p"); 
  */
  if (f){
    b.title = "@(start_video)";
  }
  /*
  else if (a.C)b.title = "Reiniciar"; 
  else if (c) {
    var m = null; 
    a.playlist && (m = g.aV(a.playlist, a._isNext?m0a(a.playlist): n0a(a.playlist)));
    if (m) {
      if (m.videoId) {
        var n =
        a.playlist.listId; b.url = a.J.U().getVideoUrl(m.videoId, n?n.toString(): void 0)}b.text = m.title; b.duration = m.lengthText?m.lengthText: m.lengthSeconds?g.zF(m.lengthSeconds): null; b.preview = m.hh("mqdefault.jpg")
      
    }
    a._isNext?(b.title = h, b["data-title-no-tooltip"] = "Pr\u00f3ximo", b["aria-keyshortcuts"] = "SHIFT+n"): (b.title = l, b["data-title-no-tooltip"] = "Anterior", b["aria-keyshortcuts"] = "SHIFT+p")
    
  } 
  */
  else if (d) {
  //  if (l = (m = a.videoData) == null?void 0: g.BS(m))b.url = l.ll(),
   // b.text = l.title,
   // b.duration = l.lengthText?l.lengthText: l.lengthSeconds?
   // g.zF(l.lengthSeconds): null,
    //b.preview = l.hh("mqdefault.jpg");
    //b.title = h;
    //b["data-title-no-tooltip"] = "Pr\u00f3ximo";
    b["aria-keyshortcuts"] = "SHIFT+n"
  }
  b.disabled=true//!d&&!c&&!e&&!f;
  a._update(b);
  a._show();
  if(canUseNextButton(a._api) && !a._isNext){
    a._hide()
  }
  //a.K=!!b.url;
  //d || c || a.C || e || f?a.B || (a.B = g.uT(a.tooltip, a.element), a.G = a.listen("click", a.onClick, a)): a.B && (a.B(), a.B = null, a.Qc(a.G), a.G = null); 
};