const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

async function viewonceCommand(sock, chatId, message) {
    try {
        // Extract quoted imageMessage or videoMessage from your structure
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const quotedImage = quoted?.imageMessage;
        const quotedVideo = quoted?.videoMessage;

        // Determine the target JID to DM:
        // - in groups message.key.participant is the sender's JID
        // - in 1:1 chats message.key.remoteJid is the sender's JID (and equals chatId)
        const targetJid = message.key?.participant || message.key?.remoteJid;

        if (!targetJid) {
            // Can't determine recipient — notify the original chat about the problem.
            await sock.sendMessage(chatId, { text: '❌ Could not determine user to DM.' }, { quoted: message });
            return;
        }

        if (quotedImage && quotedImage.viewOnce) {
            // Download the image
            const stream = await downloadContentFromMessage(quotedImage, 'image');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

            // Send as DM to the sender (no notification to original chat)
            await sock.sendMessage(targetJid, { image: buffer, fileName: 'media.jpg', caption: quotedImage.caption || '' });

            // Do NOT send any notification message to the original chat.
            return;
        } else if (quotedVideo && quotedVideo.viewOnce) {
            // Download the video
            const stream = await downloadContentFromMessage(quotedVideo, 'video');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

            // Send as DM to the sender (no notification to original chat)
            await sock.sendMessage(targetJid, { video: buffer, fileName: 'media.mp4', caption: quotedVideo.caption || '' });

            // Do NOT send any notification message to the original chat.
            return;
        } else {
            await sock.sendMessage(chatId, { text: '❌ Please reply to a view-once image or video.' }, { quoted: message });
        }
    } catch (err) {
        console.error('viewonceCommand error:', err);
        await sock.sendMessage(chatId, { text: '❌ Failed to send media to DM. Make sure the user hasn\'t blocked the bot and try again.' }, { quoted: message });
    }
}

module.exports = viewonceCommand;
