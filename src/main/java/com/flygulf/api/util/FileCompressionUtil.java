package com.flygulf.api.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

/**
 * Utility class for compressing and decompressing file data
 */
public class FileCompressionUtil {

    /**
     * Compresses byte array using DEFLATE algorithm
     * 
     * @param data Original file data
     * @return Compressed byte array
     */
    public static byte[] compressFile(byte[] data) throws IOException {
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];

        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }

        outputStream.close();
        deflater.end();

        return outputStream.toByteArray();
    }

    /**
     * Decompresses byte array using INFLATE algorithm
     * 
     * @param compressedData Compressed file data
     * @return Original decompressed byte array
     */
    public static byte[] decompressFile(byte[] compressedData) throws Exception {
        Inflater inflater = new Inflater();
        inflater.setInput(compressedData);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(compressedData.length);
        byte[] buffer = new byte[1024];

        while (!inflater.finished()) {
            int count = inflater.inflate(buffer);
            outputStream.write(buffer, 0, count);
        }

        outputStream.close();
        inflater.end();

        return outputStream.toByteArray();
    }
}
