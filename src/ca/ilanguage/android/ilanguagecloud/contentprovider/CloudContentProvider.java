package ca.ilanguage.android.ilanguagecloud.contentprovider;

import java.util.Arrays;
import java.util.HashSet;

import android.content.ContentProvider;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteQueryBuilder;
import android.net.Uri;
import android.text.TextUtils;
import ca.ilanguage.android.ilanguagecloud.database.CloudSQLiteHelper;
import ca.ilanguage.android.ilanguagecloud.database.CloudTable;

public class CloudContentProvider extends ContentProvider {

	// database
	private CloudSQLiteHelper database;

	// Used for the UriMacher
	private static final int CLOUDS = 10;
	private static final int CLOUD_ID = 20;

	private static final String AUTHORITY = "ca.ilanguage.android.ilanguagecloud.contentprovider";

	private static final String BASE_PATH = "clouds";
	public static final Uri CONTENT_URI = Uri.parse("content://" + AUTHORITY
			+ "/" + BASE_PATH);
	public static final String CONTENT_TYPE = ContentResolver.CURSOR_DIR_BASE_TYPE
			+ "/clouds";
	public static final String CONTENT_ITEM_TYPE = ContentResolver.CURSOR_ITEM_BASE_TYPE
			+ "/cloud";

	private static final UriMatcher sURIMatcher = new UriMatcher(
			UriMatcher.NO_MATCH);
	static {
		sURIMatcher.addURI(AUTHORITY, BASE_PATH, CLOUDS);
		sURIMatcher.addURI(AUTHORITY, BASE_PATH + "/#", CLOUD_ID);
	}

	@Override
	public boolean onCreate() {
		database = new CloudSQLiteHelper(getContext());
		return false;
	}

	@Override
	public Cursor query(Uri uri, String[] projection, String selection,
			String[] selectionArgs, String sortOrder) {

		// Using SQLiteQueryBuilder instead of query() method
		SQLiteQueryBuilder queryBuilder = new SQLiteQueryBuilder();

		// Check if the caller has requested a column which does not exists
		checkColumns(projection);

		// Set the table
		queryBuilder.setTables(CloudTable.TABLE_CLOUD);

		int uriType = sURIMatcher.match(uri);
		switch (uriType) {
		case CLOUDS:
			break;
		case CLOUD_ID:
			// Adding the ID to the original query
			queryBuilder.appendWhere(CloudTable.COLUMN_ID + "="
					+ uri.getLastPathSegment());
			break;
		default:
			throw new IllegalArgumentException("Unknown URI: " + uri);
		}

		SQLiteDatabase db = database.getWritableDatabase();
		Cursor cursor = queryBuilder.query(db, projection, selection,
				selectionArgs, null, null, sortOrder);
		// Make sure that potential listeners are getting notified
		cursor.setNotificationUri(getContext().getContentResolver(), uri);

		return cursor;
	}

	@Override
	public String getType(Uri uri) {
		return null;
	}

	@Override
	public Uri insert(Uri uri, ContentValues values) {
		int uriType = sURIMatcher.match(uri);
		SQLiteDatabase sqlDB = database.getWritableDatabase();
		int rowsDeleted = 0;
		long id = 0;
		switch (uriType) {
		case CLOUDS:
			id = sqlDB.insert(CloudTable.TABLE_CLOUD, null, values);
			break;
		default:
			throw new IllegalArgumentException("Unknown URI: " + uri);
		}
		getContext().getContentResolver().notifyChange(uri, null);
		return Uri.parse(BASE_PATH + "/" + id);
	}

	@Override
	public int delete(Uri uri, String selection, String[] selectionArgs) {
		int uriType = sURIMatcher.match(uri);
		SQLiteDatabase sqlDB = database.getWritableDatabase();
		int rowsDeleted = 0;
		switch (uriType) {
		case CLOUDS:
			rowsDeleted = sqlDB.delete(CloudTable.TABLE_CLOUD, selection,
					selectionArgs);
			break;
		case CLOUD_ID:
			String id = uri.getLastPathSegment();
			if (TextUtils.isEmpty(selection)) {
				rowsDeleted = sqlDB.delete(CloudTable.TABLE_CLOUD,
						CloudTable.COLUMN_ID + "=" + id, null);
			} else {
				rowsDeleted = sqlDB.delete(CloudTable.TABLE_CLOUD,
						CloudTable.COLUMN_ID + "=" + id + " and " + selection,
						selectionArgs);
			}
			break;
		default:
			throw new IllegalArgumentException("Unknown URI: " + uri);
		}
		getContext().getContentResolver().notifyChange(uri, null);
		return rowsDeleted;
	}

	@Override
	public int update(Uri uri, ContentValues values, String selection,
			String[] selectionArgs) {

		int uriType = sURIMatcher.match(uri);
		SQLiteDatabase sqlDB = database.getWritableDatabase();
		int rowsUpdated = 0;
		switch (uriType) {
		case CLOUDS:
			rowsUpdated = sqlDB.update(CloudTable.TABLE_CLOUD, values,
					selection, selectionArgs);
			break;
		case CLOUD_ID:
			String id = uri.getLastPathSegment();
			if (TextUtils.isEmpty(selection)) {
				rowsUpdated = sqlDB.update(CloudTable.TABLE_CLOUD, values,
						CloudTable.COLUMN_ID + "=" + id, null);
			} else {
				rowsUpdated = sqlDB.update(CloudTable.TABLE_CLOUD, values,
						CloudTable.COLUMN_ID + "=" + id + " and " + selection,
						selectionArgs);
			}
			break;
		default:
			throw new IllegalArgumentException("Unknown URI: " + uri);
		}
		getContext().getContentResolver().notifyChange(uri, null);
		return rowsUpdated;
	}

	private void checkColumns(String[] projection) {
		String[] available = { CloudTable.COLUMN_FONT, CloudTable.COLUMN_TITLE,
				CloudTable.COLUMN_CONTENTS, CloudTable.COLUMN_ID };
		if (projection != null) {
			HashSet<String> requestedColumns = new HashSet<String>(
					Arrays.asList(projection));
			HashSet<String> availableColumns = new HashSet<String>(
					Arrays.asList(available));
			// Check if all columns which are requested are available
			if (!availableColumns.containsAll(requestedColumns)) {
				throw new IllegalArgumentException(
						"Unknown columns in projection");
			}
		}
	}

}
