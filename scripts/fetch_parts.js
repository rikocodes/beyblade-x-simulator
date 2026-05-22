// Simple scraper to fetch parts pages and extract basic parameters.
// Saves a JSON file to data/parts.json with minimal structured data.
// NOTE: This is a minimal example. Running this file requires node, node-fetch and cheerio.

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const OUT_DIR = path.join(__dirname,'..','data');
if(!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR,{recursive:true});

async function fetchPage(url){
  const res = await fetch(url, {headers:{'User-Agent':'bey-sim-updater/1.0'}});
  if(!res.ok) throw new Error('Fetch failed '+url);
  return await res.text();
}

async function extractFromBeybladePlanner(html){
  const $ = cheerio.load(html);
  const out={parts:[]};
  // Best-effort extraction: look for table rows with param names and numeric values
  $('table tr').each((i,el)=>{
    const t = $(el).text().trim();
    if(!t) return;
    out.parts.push(t);
  });
  return out;
}

async function extractFromFandom(html){
  const $ = cheerio.load(html);
  const out={defaults:{}};
  // try to read infobox numeric fields
  $('.infobox tr').each((i,el)=>{
    const key=$(el).find('th').text().trim();
    const val=$(el).find('td').text().trim();
    if(key&&val){
      out.defaults[key]=val;
    }
  });
  return out;
}

async function main(){
  const urls=[
    'https://beybladeplanner.com/parts.php',
    'https://beyblade.fandom.com/wiki/Beyblade'
  ];
  const results={fetched:Date.now(),sources:{}};
  for(const u of urls){
    try{
      const html = await fetchPage(u);
      if(u.includes('beybladeplanner')) results.sources['planner']=await extractFromBeybladePlanner(html);
      else results.sources['fandom']=await extractFromFandom(html);
      // save raw html for debugging
      const name = u.replace(/https?:\/\//,'').replace(/[\W]+/g,'_');
      fs.writeFileSync(path.join(OUT_DIR, name+'.html'), html, 'utf8');
    }catch(e){
      console.error('Error fetching',u,e.message);
      results.sources[u]={error:e.message};
    }
  }
  // create a simple suggestedPresets mapping from planner if possible (stub)
  results.suggestedPresets={};
  // write out
  fs.writeFileSync(path.join(OUT_DIR,'parts.json'), JSON.stringify(results,null,2),'utf8');
  console.log('Wrote data/parts.json');
}

main().catch(e=>{console.error(e);process.exit(1);});
