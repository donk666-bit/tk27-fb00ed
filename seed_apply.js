(function(){
  var S = window.__LUOYAN_SEED; if (!S) return;
  var VER = S.vers || "1";
  try { if (localStorage.getItem("luoyan_seed_vers") === VER) return; } catch(e){}
  function mergeMaps(a, b){
    var o = {}; var k;
    for (k in (b||{})) o[k] = b[k];
    for (k in (a||{})) o[k] = a[k];
    return o;
  }
  var papers = S.papers || {}, id, key, cur, st, next;
  for (id in papers) {
    key = "luoyan_mock_v1_set" + id; next = papers[id];
    cur = null;
    try { cur = JSON.parse(localStorage.getItem(key) || "null"); } catch(e){}
    if (!cur) { st = next; }
    else {
      st = Object.assign({}, next, cur);
      st.answers = mergeMaps(cur.answers, next.answers);
      st.flags = mergeMaps(cur.flags, next.flags);
      if (typeof cur.left === "number" && typeof next.left === "number") st.left = Math.min(cur.left, next.left);
      st.submitted = !!(cur.submitted || next.submitted);
      st.running = !!cur.running;
      if (!st.wrongSet || !Object.keys(st.wrongSet).length) st.wrongSet = next.wrongSet || null;
    }
    try { localStorage.setItem(key, JSON.stringify(st)); } catch(e){}
  }
  var banks = S.banks || {}, bcur, bst, nb, ck;
  for (key in banks) {
    bcur = null;
    try { bcur = JSON.parse(localStorage.getItem(key) || "null"); } catch(e){}
    bst = Object.assign({ans:{}, wrong:{}, collect:{}}, bcur || {});
    nb = banks[key];
    bst.ans = mergeMaps(bst.ans, nb.ans);
    bst.wrong = mergeMaps(bst.wrong, nb.wrong);
    bst.collect = mergeMaps(bst.collect, nb.collect);
    if (nb.stats) {
      bst.stats = bst.stats || {r:0,w:0};
      bst.stats.r = Math.max(bst.stats.r||0, nb.stats.r||0);
      bst.stats.w = Math.max(bst.stats.w||0, nb.stats.w||0);
    }
    if (nb.base) {
      bst.base = bst.base || {ch:{}, done:0};
      bst.base.done = Math.max(bst.base.done||0, nb.base.done||0);
      bst.base.asof = bst.base.asof || nb.base.asof || "";
      for (ck in (nb.base.ch||{})) bst.base.ch[ck] = Math.max(bst.base.ch[ck]||0, nb.base.ch[ck]);
    }
    try { localStorage.setItem(key, JSON.stringify(bst)); } catch(e){}
  }
  try { localStorage.setItem("luoyan_seed_vers", VER); } catch(e){}
})();
