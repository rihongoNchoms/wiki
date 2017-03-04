package com.koreaap.sys.framework.util;

import java.security.Key;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.SecureRandom;

import javax.crypto.Cipher;

import org.apache.commons.codec.binary.Base64;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.encoding.MessageDigestPasswordEncoder;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;

public class EncryptionUtil {
	
	/**
	 * log 처리를 위한 변수 선언
	 */
	private static final Logger logger = LoggerFactory.getLogger(EncryptionUtil.class);
	
	private static final int RSA_KEY_SIZE = 1024;

	/**
	 * RSA keyPair 생성
	 */
	public static KeyPair generateRsaKeyPair() {
		
		KeyPair pair = null;
        
		try {
			SecureRandom random = new SecureRandom();
	        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
			generator.initialize(RSA_KEY_SIZE, random);
	        pair = generator.generateKeyPair();
		} catch (Exception e) {
			logger.info("EncryptionUtil.generateKeyPair() error");
			throw new RuntimeException(e);
		}

        return pair;
	}
	
	/**
	 * KeyPair 의 공개키 String 가져오기 (Base64 encoding)
	 */
	public static String getPublicKeyString(KeyPair pair) {
		if(pair == null)
			return "";
		
		Key pubKey = pair.getPublic();
		return new String(Base64.encodeBase64(pubKey.getEncoded()));
	}
	
	public static String getPublicKeyString(Key pubKey) {
		if(pubKey == null)
			return "";
		
		return new String(Base64.encodeBase64(pubKey.getEncoded()));
	}
	
	/**
	 * KeyPair 의 비밀키 String 가져오기 (Base64 encoding)
	 */
	public static String getPrivateKeyString(KeyPair pair) {
		if(pair == null)
			return "";
		
		Key privKey = pair.getPrivate();
		return new String(Base64.encodeBase64(privKey.getEncoded()));
	}
	
	public static String getPrivateKeyString(Key privKey) {
		if(privKey == null)
			return "";
		
		return new String(Base64.encodeBase64(privKey.getEncoded()));
	}
	
	/**
	 * RSA 공개키로 암호화
	 */
	public static byte[] encryptRsaPublicKey(Key pubKey, String plainText) {
		
		byte[] cipherText = null;
		
		if(plainText == null)
			return null;
		
		try {
			Cipher cipher = Cipher.getInstance("RSA");
			cipher.init(Cipher.ENCRYPT_MODE, pubKey);
	        cipherText = cipher.doFinal(plainText.getBytes());
		} catch (Exception e) {
			logger.info("EncryptionUtil.encryptRsaPublicKey() error");
			throw new RuntimeException(e);
		}
		
		return cipherText;
	}
	
	/**
	 * RSA 비밀키로 복호화
	 */
	public static String decryptRsaPrivateKey(Key privKey, byte[] cipherText) {
		
		String plainText = null;
		
		if(cipherText == null)
			return null;
		
		try {
			Cipher cipher = Cipher.getInstance("RSA");
			cipher.init(Cipher.DECRYPT_MODE, privKey);
			plainText = new String(cipher.doFinal(cipherText));
		} catch (Exception e) {
			logger.info("EncryptionUtil.decryptRsaPrivateKey() error");
			throw new RuntimeException(e);
		}
		
		return plainText;
	}
	
	/**
	 * SHA256 Hash
	 */
	public static String sha256(String rawPass, String salt, int iterations) {
		MessageDigestPasswordEncoder encoder = new ShaPasswordEncoder(256);
		encoder.setIterations(iterations);
		return encoder.encodePassword(rawPass, salt);
	}
	
	/**
	 * encrypt Password-Based Encryption
	 */
	public static String encryptPbe(String text, String algorithm, String password) {
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		encryptor.setAlgorithm(algorithm);
		encryptor.setPassword(password);
		return encryptor.encrypt(text);
	}
	
	/**
	 * decrypt Password-Based Encryption
	 */
	public static String decryptPbe(String text, String algorithm, String password) {
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		encryptor.setAlgorithm(algorithm);
		encryptor.setPassword(password);
		return encryptor.decrypt(text);
	}
	
}
