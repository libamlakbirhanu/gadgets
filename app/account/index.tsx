import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import Avatar from "../../components/avatar";
import { useAuth } from "../../providers/auth-provider";

export default function Account() {
  const { session, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("users")
        .select("email, username, phone, avatar_url")
        .eq("id", session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setEmail(data.email);
        setUsername(data.username);
        setPhone(data.phone);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    phone,
    avatar_url,
  }: {
    username: string;
    phone: string;
    avatar_url: string;
  }) {
    try {
      if (!session?.user) throw new Error("No user on the session!");
      setLoading(true);

      const updates = {
        id: session?.user.id,
        username,
        phone,
        avatar_url,
        // updated_at: new Date(),
      };

      const { error } = await supabase.from("users").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, phone, avatar_url: url });
          }}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={email}
          editable={false}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username || ""}
          onChangeText={setUsername}
          placeholder="Enter username"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone || ""}
          onChangeText={setPhone}
          placeholder="Enter phone"
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() =>
            updateProfile({ username, phone, avatar_url: avatarUrl })
          }
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Loading ..." : "Update"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.verticallySpaced}>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => signOut()}
        >
          <Text style={styles.buttonOutlineText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  label: {
    color: "#86939e",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#86939e",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  buttonOutlineText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
