import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// Curated derivatives from the Facebook archive (legacy-site/veilig/).
// Not a 1:1 dump of all 67 photos — near-duplicate/low-value shots (repetitive
// interior loft photos, multi-photo posts where one frame already tells the
// story) are skipped during curation. The raw export itself is never
// referenced from content or committed as a build output.
const SRC = 'legacy-site/veilig';

const duivenJobs = [
  { src: `${SRC}/20230923/470632316_936199411805032_3533954069722086366_n.jpg`, out: 'src/assets/duiven/stitch-dochter.webp' },
  { src: `${SRC}/20240601/472365386_946044270820546_8962737341127209945_n.jpg`, out: 'src/assets/duiven/rode-doffer-barcelona.webp' },
  { src: `${SRC}/20250514/497581771_1037160111708961_6041139749199493274_n.jpg`, out: 'src/assets/duiven/zesde-nat-st-vincent-doffer.webp' },
  { src: `${SRC}/20260705/738552655_1360154239409545_3638997430999919102_n.jpg`, out: 'src/assets/duiven/barcelona-paar-2026.webp' },
];

const mediaJobs = [
  { src: `${SRC}/20230312/469971713_930855869006053_3218211814286562917_n.jpg`, out: 'src/assets/media/20230312.webp' },
  { src: `${SRC}/20230716/470196149_932763088815331_2690113289989922636_n.jpg`, out: 'src/assets/media/20230716.webp' },
  { src: `${SRC}/20230909/470592924_935272818564358_4843107624267307879_n.jpg`, out: 'src/assets/media/20230909.webp' },
  { src: `${SRC}/20230916/470235183_935278551897118_252417050936233556_n.jpg`, out: 'src/assets/media/20230916.webp' },
  { src: `${SRC}/2023_overig/469921530_930866279005012_8545536708412356603_n.jpg`, out: 'src/assets/media/2023-overig.webp' },
  { src: `${SRC}/20240121/471175573_938637404894566_3801557225240709917_n.jpg`, out: 'src/assets/media/20240121.webp' },
  { src: `${SRC}/20240211/472158040_945430000881973_4744299468572874698_n.jpg`, out: 'src/assets/media/20240211.webp' },
  { src: `${SRC}/20240311/472280931_945441757547464_1033008671593077637_n.jpg`, out: 'src/assets/media/20240311.webp' },
  { src: `${SRC}/20240512/472517324_946039970820976_2976553856672065642_n.jpg`, out: 'src/assets/media/20240512.webp' },
  { src: `${SRC}/20240515/472404697_946039934154313_6806578179117081756_n.jpg`, out: 'src/assets/media/20240515.webp' },
  { src: `${SRC}/20240622/472166407_946050920819881_8761776562370134265_n.jpg`, out: 'src/assets/media/20240622.webp' },
  { src: `${SRC}/20250104/475547635_965602738864699_8798531147996568697_n.jpg`, out: 'src/assets/media/20250104.webp' },
  { src: `${SRC}/20250213/479702772_972842934807346_2829538851044253356_n.jpg`, out: 'src/assets/media/20250213.webp' },
  { src: `${SRC}/20250608/504988485_1054510113307294_5911893804878915380_n.jpg`, out: 'src/assets/media/20250608.webp' },
  { src: `${SRC}/20250612/506110051_1057466599678312_6955452496934453102_n.jpg`, out: 'src/assets/media/20250612.webp' },
  { src: `${SRC}/20250622/509938421_1064516428973329_8334405859951939505_n.jpg`, out: 'src/assets/media/20250622.webp' },
  { src: `${SRC}/20250706/516094064_1075280197896952_6170294166967535311_n.jpg`, out: 'src/assets/media/20250706.webp' },
  { src: `${SRC}/20260510/695627394_1313728517385451_737370959537884537_n.jpg`, out: 'src/assets/media/20260510.webp' },
  { src: `${SRC}/20260522/703907008_1323090079782628_3705649394454819928_n.jpg`, out: 'src/assets/media/20260522.webp' },
  { src: `${SRC}/20260605/715516687_1335343055223997_2040797244428110221_n.jpg`, out: 'src/assets/media/20260605.webp' },
  { src: `${SRC}/20260606/717439393_1335625085195794_6041961061596700948_n.jpg`, out: 'src/assets/media/20260606.webp' },
  { src: `${SRC}/20260616/724062014_1344108937680742_529524566847979462_n.jpg`, out: 'src/assets/media/20260616.webp' },
  { src: `${SRC}/20260625/732206388_1351345150290454_9053100842481412537_n.jpg`, out: 'src/assets/media/20260625.webp' },
  { src: `${SRC}/20260703/735897808_1357901032968199_4392933195194306697_n.jpg`, out: 'src/assets/media/20260703.webp' },
];

// Scanned documents (official uitslagen) need more width/quality to stay legible.
const documentJobs = [
  { src: `${SRC}/20230618/470145063_932207118870928_2272924114118893949_n.jpg`, out: 'src/assets/media/20230618-uitslag.webp' },
  { src: `${SRC}/20221001/470142241_930287892396184_7419884275464268655_n.jpg`, out: 'src/assets/media/20220708-dax-teletekst.webp' },
  { src: `${SRC}/20221001/470172911_930287805729526_5495118072921698977_n.jpg`, out: 'src/assets/media/20220723-tarbes-teletekst.webp' },
];

await mkdir('src/assets/duiven', { recursive: true });
await mkdir('src/assets/media', { recursive: true });

async function run(jobs, width, quality) {
  for (const job of jobs) {
    const info = await sharp(job.src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(job.out);
    console.log(`${job.src} -> ${job.out}: ${(info.size / 1024).toFixed(0)}KB (${info.width}x${info.height})`);
  }
}

// Portraits: a bit larger since duif profile pages show them prominently.
await run(duivenJobs, 800, 74);
// Gallery grid: smaller is plenty, keeps the gallery page light.
await run(mediaJobs, 900, 68);
// Documents: wider and higher quality so the printed text stays readable.
await run(documentJobs, 1400, 85);
