const fs = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');

async function processFiles() {
  try {
    // JSON 파일을 읽어오고 파싱
    const dataPath = path.join(__dirname, '../public/assets/data/data.json');
    const newDataPath = path.join(__dirname, '../public/assets/data/new-data.json');
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const newData = [];

    for (let item of data) {
      // UUID 생성
      const newId = uuid();

      const newItem = {
        id: newId,
        title: item.title,
        location: item.location,
        area: item.area,
        address: item.address,
        description: item.description,
        playtime: item.playtime,
        isHorror: item.special_tags.filter((i) => i === '공포').length > 0,
        page: item.store_homepage,
        price: item.price || 0,
        reservePageUrl: item.reserve_url,
        branchName: item.store_name,
        branchTel: item.store_tel,
      };

      newData.push(newItem);

      // thumb_loc으로부터 파일 위치 구성
      const thumbLocPath = path.join(__dirname, '../public/assets/theme-img', item.thumb_loc.split('/')[1] + '.jpg');

      // 파일 존재 여부 확인 후 이름 변경
      try {
        console.log(thumbLocPath);
        await fs.access(thumbLocPath); // 파일이 존재하는지 확인
        const newThumbName = `thumb_${newId}${path.extname(item.thumb_loc)}`; // 확장자는 기존 그대로
        const newThumbPath = path.join(__dirname, '../public/assets/theme-img', newThumbName + '.jpg');

        // 파일명 변경
        await fs.rename(thumbLocPath, newThumbPath);
      } catch (err) {
        console.log(`File not found for thumb_loc: ${item.thumb_loc}, skipping rename.`);
      }
    }

    // 업데이트된 내용을 다시 JSON 파일로 작성
    await fs.writeFile(newDataPath, JSON.stringify(newData), 'utf8');
    console.log('Processing completed successfully.');
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

async function downloadImage(url, savePath, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // ReadableStream을 Uint8Array로 변환
      const reader = response.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const uint8Array = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
      let offset = 0;
      for (const chunk of chunks) {
        uint8Array.set(chunk, offset);
        offset += chunk.length;
      }

      // 파일로 저장
      await fs.writeFile(savePath, uint8Array);
      return true;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Retry ${i + 1}/${retries} for ${url}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

async function downloadImage(url, savePath, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const uint8Array = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
      let offset = 0;
      for (const chunk of chunks) {
        uint8Array.set(chunk, offset);
        offset += chunk.length;
      }

      await fs.writeFile(savePath, uint8Array);
      return true;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Retry ${i + 1}/${retries} for ${url}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

async function imageLoad() {
  try {
    const dataPath = path.join(__dirname, '../public/assets/data/data.json');
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));

    console.log(`Found ${data.length} items to process`);

    const results = {
      successful: [],
      failed: [],
    };

    for (let [index, item] of data.entries()) {
      try {
        const imageUrl = `https://cdn.keigon.net/${item.thumb_loc.split('/')[0]}/${item.thumb_loc.split('/')[1]}`;
        const fileName = `${item.thumb_loc.split('/')}.png`;
        const newThumbPath = path.join(__dirname, '../public/assets/download-image', fileName);

        process.stdout.write(`\rProcessing ${index + 1}/${data.length}: ${fileName}`);

        // 이미지 다운로드
        await downloadImage(imageUrl, newThumbPath);

        results.successful.push({
          id: item.id,
          fileName: fileName,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        results.failed.push({
          id: item.id,
          thumb_loc: item.thumb_loc,
          error: error.message,
        });
        console.error(`\n❌ Failed to download ${item.thumb_loc}:`, error.message);
      }
    }

    console.log('\n\n=== Download Summary ===');
    console.log(`✅ Successfully downloaded: ${results.successful.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);

    if (results.failed.length > 0) {
      console.log('\nFailed Downloads:');
      results.failed.forEach((fail) => {
        console.log(`- ${fail.thumb_loc}: ${fail.error}`);
      });

      const logPath = path.join(__dirname, 'download_errors.json');
      await fs.writeFile(logPath, JSON.stringify(results.failed, null, 2));
      console.log(`\nError log saved to: ${logPath}`);
    }
  } catch (error) {
    console.error('Failed to read data file:', error);
    throw error;
  }
}

imageLoad()
  .then(() => {
    console.log('\nProcess completed');
  })
  .catch((error) => {
    console.error('\nProcess failed:', error);
    process.exit(1);
  });
