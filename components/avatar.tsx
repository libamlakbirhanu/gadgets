import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useError } from "../providers/error-provider";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const avatarSize = { height: size, width: size };
  const { handleError } = useError();

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      // If it's an external URL (starts with http/https), use it directly
      if (path.startsWith("http://") || path.startsWith("https://")) {
        setAvatarUrl(path);
        return;
      }

      // Otherwise, download from Supabase storage
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      handleError(error, "Failed to download avatar");
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const image = result.assets[0];

      if (!image.uri) {
        throw new Error("No image selected");
      }

      // Check file size (image.fileSize is in bytes)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
      if (image.fileSize && image.fileSize > MAX_FILE_SIZE) {
        throw new Error(
          `Image size must be less than 5MB. Selected image is ${(
            image.fileSize /
            (1024 * 1024)
          ).toFixed(2)}MB`
        );
        return;
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(data.path);
    } catch (error) {
      handleError(error, "Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={uploadAvatar}
        disabled={uploading}
        style={[styles.avatarContainer, avatarSize]}
      >
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            style={[styles.avatar, avatarSize]}
          />
        ) : (
          <View style={[styles.placeholder, avatarSize]}>
            <Ionicons name="person-outline" size={size / 2} color="#9CA3AF" />
          </View>
        )}

        <View style={styles.uploadOverlay}>
          {uploading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="camera" size={24} color="#FFFFFF" />
              <Text style={styles.uploadText}>
                {avatarUrl ? "Change" : "Upload"}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    borderRadius: 100,
  },
  placeholder: {
    backgroundColor: "#F3F4F6",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    height: "30%",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  uploadText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
