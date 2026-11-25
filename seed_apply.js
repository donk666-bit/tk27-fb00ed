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
  var banks = S.banks || {}, bcur, bst;
  for (key in banks) {
    bcur = null;
    try { bcur = JSON.parse(localStorage.getItem(key) || "null"); } catch(e){}
    bst = Object.assign({ans:{}, wrong:{}, collect:{}}, bcur || {});
    bst.ans = mergeMaps(bst.ans, banks[key].ans);
    bst.wrong = mergeMaps(bst.wrong, banks[key].wrong);
    bst.collect = mergeMaps(bst.collect, banks[key].collect);
    try { localStorage.setItem(key, JSON.stringify(bst)); } catch(e){}
  }
  try { localStorage.setItem("luoyan_seed_vers", VER); } catch(e){}
})();
