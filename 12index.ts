import axios from 'axios';

const uploadObjectToS3 = async (filePath: string, bucketName: string) => {
    try {
        const fileContent = await Bun.file(filePath).arrayBuffer();
        const fileName = filePath.split('/').pop() || 'default.txt';
        
        // const JWT_SECRET = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..TpvS3pWpMysGALw3.8-JlRp48Xw1oe-xFPhIk0PkcRXpvC7_pBvogUiS-texfRDLULsM42a4ikUbhsED5P8NPEDIj_1Q3j2r5qzkkQrnf7Qad0WjNBQFOAaTRHUMOCVQ4vT509ItBS5OYMtlyE_MJHv_IThGlQeurRKJMe6efdWpMGA6SZPZgXxBw0h8tgTOFx3iZ7ZXcAB2K0236pJPcNhxN4PjVuz474scxTho-HdxpjgagcdRIKRBunP46K04y2H0YSnLsm_PtZx1E0TJrq5WvnTdqYOMhL2WTNIxF3rA90lvfq3gsDAcztmBQfHgEfeHTh1r1ESN9KEdIBrQHfurNTfcLlTr-xAMEXmjQaSWipp9zT77Cx-EsdvMmCqHoy2I0QpXHYIaVOzy0tv21j6mEAo-EaA1pr1kA1NvKQY0y2iwnYYbZ5zW7KZ_XKezqApXb-iTyHb_Rt23xX1F5Wy9ng5c4yDjgqdtr5mG7PcbR2xUaIQHipjfdMl28ExC2TvJTOhxecmuExQ8fWT1Dm7u4noPn5i2Yn0vVuKiq5Jtij1zIjPft0xfr6EZ2W0GlwQHiC_uRZmiBBB0GysfjpFpviVfgVGCOPHvYvKZujvo-FhrQTVMPRutnp3Vh5gWiS0eIhgC-SrkRtQ_8AyvKbyKOmeUxkyFp9i4YPG56pM-jpfoZ8ve2D8xLWlNFNtyJockLTjBTS6lQ5beu0FJl1ZvJiv76qo9-mhGEWJJ1xfwFhdm3eMRo9ltxQm4IQoc-uulnTqBVEBzDsMxEOBr9nRC7wHgIEYgNN8Jd7VkcBqGGGxw4MoJkX31716bcurgmolL8Q6_HAzKEknQcSc-xvZcje7Tn8_y0g76qjL3cdioBqnaiHp4inI5NZBcFo0mfksD3L1opPf-gN_OzkCl4XUIywAzyYqv9_jbuHuLachRCELFk7eU2ovoeurxQgfIvhVtQaqFyQzSq9P9bOLKuDXEBU4isDesjC6jgAj8LmnbOlsij_zuVvR3ogXsDIUjxKDc6aK5Fyyz8AuLSl6VPFXz58uLZtL5K05xTDNFLzlJe81Pu7hdQMp8im1FsPDv6ZKydlJXCCSiDvGDoyPZcXFEW68vtC8V4cLGTUdXxnlmB4GXg8oJuRDZBMDW_WGtcpZHW7V5TVETqMkvHIp8D755esVRemehymKu0INRnF2hAuAf0apJhcjDtrj_EUt1_FSdIu2sVAxb7tJc1ra4o7FY-b_ToZlA3LV48uR-OUvG_Lh22Uzn87RTPybQX3YqhUTE2NAwWLSe2OwazbJgAVvigw6inNgwgmr7ykY8WU_2LQBl-Hu_M1sTGuklPZ9rsMC_QLFBqt2mHVZ2WKFjk-XCA4NnFZffi9Lsz47FlQKMJ5VHEAvHw_jKgZ8WIvkvnvlPbRsaf9M-EJPqzDu3Xb7FZUKfwLJHpAKRC0aiEtnn06G08vosPZ8VrWUonYZqcVRY0-puIe9ViyaFyIOcrZYq-CSk11jNt_qvyBHQpVRWjQK2amnosBZq9OkL-42SE73Z8soGi3-Z3YnDRvc-K6RJgN3WdL2LkyvHTOsdqT_ckW9tVKcXE-cmX51VKZ5Gzp3XYWdFKLhl06g0ZOMKP6lCy9VhLtQdQxWz_lZc-oc5BhGeAz7YgTyGBLxrhFCaePW1wEL61Fh65Klt9AMkfWAE7r8qK9PJmY3n48f4buVLOP8kGIh8K1LUaMQbJDQ9zU3WWgJ1wMmHwo2JsA5kTeXOW26aBtoiqzmg0dZbxN7T0PdMDI-YmELTNLZn626yOi1UJ4JoH6Bm7GbwtZa3ij27eDrc2FfhBLZDXt433nhmmCMF4hxMsDBY9EhIZ-65qUs7RdJIRO4X3TsCE4oe-tDPWIdaexvQGkaDlXIW3xcoiTmAfFhJhxy0Z59JRbvSteyy4GNJct9jgzeL6OwNwni9k73UaVlvUAy1153feUNkDyCywgz8S4IBKMBz-iRvxE4_-zZURVfivPm8LgNQi3HAcvinhEd0PcXTzkxhh6_fU4sziOBvuLaBh-EMfKLja7c8x5LTc12HjuUA1UdTS9xPk08l7B0S8ITEwCilhbVfCet-91EqnlBVBdlRydeyRIbCYfyI2Bis7xvsVX4MhFTIcSBGOspwIB4Kox38YD_29fiKtkptp3Mlf9XcedTUWbDYgyzJSLJqH8dYizRkmVbxD7EERJ82Zeq461NrYWFzlMXzjYeucwOGwObrk1uRatjY5ehLMwQHsf_sYniSUEEijVkcV-uWlxIKnpUzYZi-PwPaEZzZtjp7eDrh8AeBe--n3N8jNCXAWDhH55nl30-HATEHZFZqhMz5_CvtCXncSfngyzXKusJ79Irae7Bt-4fRDBl8AGGdubqJFIga4FU-f66m2ZJ4tNnEwKGP9WA2NECDpSlsgCtYqdtp7o-eKtnuwmCk1KiPqbVpw-VsVaHwsBiHKJ6yOMSBXwCyxy0sChlMcvpFKC38ht1howTUyLDDtnC_TiXCQ53PuAFO3NlrjfX0gNnLipa2vPBwSLYnnG1ZO8zeRGnagatjXMCbVrgfpB8OIvITq0VfVpk_BXgFfg441MQgXQgvE2N3cjFxTQGB-2DccDz82je5T2oK5pa8XxeB1urA2NHP-ZoZg2rSAkiM5v--hjOi8sB3FXCt4paHkrcFRF6iGAsGE_fd2DipzVQsYxDT-IPIiQcFb0wz7TiOC732KUbTjpGslZ_aKXSTx580bjHqDzR7eHX9m6imOVvvNrO3gicSf5nDewQ8Fe2n3GfPpgDS32xWS2KoCkTE0ZKsKOO6q6Y4x5xh5UKJjo_5VdS0en9WCpoVR48veZAOn5EFTn5pqPn6oY2R18eS4_sJJuXlxQjjKt2S4vsnSdL4xKbuoS8mFJNxq-KGbadDYHYYCvulIhqLqRotyHKFfClHlFnuLL_lHJrBiqi_gDlDy2Ptg2riwPaLPKwSb4kZinUoP-UP9a29Imgmt6Oq0S9bvkUJR6V_GS3zgpE0g5_ARPxHc3dFApbCpo1lSaOTiNwtehinFOocfadnDUD9CRHAW0iZnBWLhcf-LzRbYmt6wGHzo0rcRlzPX0hMP4OKX7xz16mDaoJlmSEwcPuqBc0t0HAjDaaFLP5U_RnOqTff8wEB_O1JxdZma_Xw4iBz6FpFGv6GwKTtefo1FeUe9lzBqVGj6E0HfeVP9oxthNF9iFpJQN1ltVZ-FJ578_V7pr3g2OeNlyO6yW7bBPzHt6cKbQ64Y9w3R6vYnanhpUVZ-fE1QFqnL2hn9pFtbEUZbMrctgs43xSC5DjVdHSmrLF7mJhY9ugz87FwbFOl5Lj1BSMgmIea4qIlSGWjuY8MRxDgWHe5olefoSsS_uxxwwmfSBqtRsvMZJTNkxkIJHNngR7QYfZt-rfxsy1C1nsGzFVn_xnAw9jtnSktZL2JdWFpmLAUikSOM2w8B-fGe4WJtI2S-mB-e5WwctjRaWI9h5uqhQ-Z8AJiZTnevWjrWguNnmnzFbd7uOnVAZbok5arwRUSbQo3aNoPnj0HSCWBayG3j99KoRJumXiur_GuEG9mF4JTaRhzp38U4HCoQ-3JQvZYHHWXWipTHM0m1cN4LYNPY1bF7cgVyGdI-YjkSh9LbEc0x9VDh5dA4V510gtMIN0ytmXPMvDXvri9j2OHRCUsRyQ.1Xv9Xo0R_J8VmF44xrMHWg";
        const response = await fetch(`https://s3.amazonaws.com/${bucketName}/${fileName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/octet-stream',
            'x-amz-acl': 'public-read',
            'Authorization': `Bearer ${JWT_SECRET}`
        },
        body: fileContent
        });
        if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
        }
    
        console.log(`File uploaded successfully to ${bucketName}/${fileName}`);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

const main = async () => {
    const filePath = './path/to/your/file.txt'; // Replace with your file path
    const bucketName = 'your-s3-bucket-name'; // Replace with your S3 bucket name

    await uploadObjectToS3(filePath, bucketName);
};

main().catch(console.error);


const call = async()=>{
    var config = {
    method: 'post',
    url: 'https://api.openai.com/v1/completions',
    headers: { 
        'Authorization': 'Bearer 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', 
        'Content-Type': 'application/json'
    },
        data : data
    };
    return await axios(config).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error('Error making API request:', error);
        throw error;
    });
} 

call().then((response) => {
    console.log('API Response:', response);
}).catch((error) => {
    console.error('Error:', error);
});